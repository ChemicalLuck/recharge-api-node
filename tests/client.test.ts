import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import RechargeClient from "~/client";
import {
  RechargeAPIVersion,
  HTTPResponseError,
  RechargeAPIError
} from "~/models";

// The global `fetch` (Node 20+) is stubbed so we can observe outgoing requests
// and script responses. Real `Request`/`Response` globals are used throughout.
const mockedFetch = vi.fn<typeof fetch>();

function fakeResponse(init: {
  status?: number;
  body?: unknown;
  headers?: Record<string, string>;
}): Response {
  const { status = 200, body, headers = {} } = init;
  const text =
    body === undefined
      ? ""
      : typeof body === "string"
        ? body
        : JSON.stringify(body);
  // 204/205/304 responses may not carry a body.
  const bodyInit =
    status === 204 || status === 205 || status === 304 ? null : text;
  return new Response(bodyInit, { status, headers });
}

function requests(): Request[] {
  return mockedFetch.mock.calls.map((c) => c[0] as Request);
}

function bodyOf(req: Request): Promise<string> {
  return req.text();
}

const URL_BASE = "https://api.rechargeapps.com";

let client: RechargeClient;

beforeEach(() => {
  mockedFetch.mockReset();
  vi.stubGlobal("fetch", mockedFetch);
  client = new RechargeClient("test-token");
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("headers", () => {
  it("sends the X-Recharge-Version header for v2 (not X-Recharge-API-Version)", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ body: {} }));
    await client.get(`${URL_BASE}/subscriptions`, RechargeAPIVersion.v2);

    const [req] = requests();
    expect(req.headers.get("X-Recharge-Version")).toBe("2021-11");
    expect(req.headers.has("X-Recharge-API-Version")).toBe(false);
    expect(req.headers.get("X-Recharge-Access-Token")).toBe("test-token");
  });

  it("sends the correct version header for v1", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ body: {} }));
    await client.get(`${URL_BASE}/addresses`, RechargeAPIVersion.v1);
    expect(requests()[0].headers.get("X-Recharge-Version")).toBe("2021-01");
  });
});

describe("request body", () => {
  it("does not send a body on GET", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ body: {} }));
    await client.get(`${URL_BASE}/subscriptions`, RechargeAPIVersion.v2);
    expect(await bodyOf(requests()[0])).toBe("");
  });

  it("serializes the body on POST", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ body: {} }));
    await client.post(`${URL_BASE}/subscriptions`, RechargeAPIVersion.v2, {
      a: 1
    });
    expect(await bodyOf(requests()[0])).toBe(JSON.stringify({ a: 1 }));
  });

  it("sends a body on DELETE when provided (e.g. collections.removeProducts)", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ status: 204 }));
    await client.delete(
      `${URL_BASE}/collections/1/products`,
      RechargeAPIVersion.v2,
      { product_ids: [1, 2] }
    );
    const [req] = requests();
    expect(req.method).toBe("DELETE");
    expect(await bodyOf(req)).toBe(JSON.stringify({ product_ids: [1, 2] }));
  });
});

describe("empty / 204 responses", () => {
  it("returns undefined on 204 No Content", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ status: 204 }));
    const result = await client.delete(
      `${URL_BASE}/subscriptions/1`,
      RechargeAPIVersion.v2
    );
    expect(result).toBeUndefined();
  });

  it("returns undefined on an empty 200 body instead of throwing", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ status: 200, body: "" }));
    const result = await client.post(
      `${URL_BASE}/subscriptions/1/activate`,
      RechargeAPIVersion.v2
    );
    expect(result).toBeUndefined();
  });
});

describe("error handling", () => {
  it("throws HTTPResponseError carrying status and parsed body", async () => {
    const errorBody = { errors: { customer_id: "is invalid" } };
    mockedFetch.mockResolvedValue(
      fakeResponse({ status: 422, body: errorBody })
    );

    await expect(
      client.get(`${URL_BASE}/customers/1`, RechargeAPIVersion.v2)
    ).rejects.toMatchObject({
      name: "HTTPResponseError",
      status: 422,
      body: errorBody
    });
  });

  it("HTTPResponseError is an instance of Error", async () => {
    mockedFetch.mockResolvedValue(fakeResponse({ status: 404, body: "" }));
    const err = await client
      .get(`${URL_BASE}/customers/1`, RechargeAPIVersion.v2)
      .catch((e: unknown) => e);
    expect(err).toBeInstanceOf(HTTPResponseError);
  });
});

describe("retries", () => {
  it("retries on 429 then succeeds, isolating retry state per request", async () => {
    vi.useFakeTimers();
    mockedFetch
      .mockResolvedValueOnce(fakeResponse({ status: 429 }))
      .mockResolvedValueOnce(fakeResponse({ status: 200, body: { ok: true } }));

    const promise = client.get(`${URL_BASE}/charges`, RechargeAPIVersion.v2);
    await vi.runAllTimersAsync();
    const result = await promise;

    expect(result).toEqual({ ok: true });
    expect(mockedFetch).toHaveBeenCalledTimes(2);
  });

  it("re-sends the request body on retry (POST body is not lost)", async () => {
    vi.useFakeTimers();
    mockedFetch
      .mockResolvedValueOnce(fakeResponse({ status: 500 }))
      .mockResolvedValueOnce(fakeResponse({ status: 200, body: { id: 1 } }));

    const payload = { charge_id: 99 };
    const promise = client.post(
      `${URL_BASE}/subscriptions`,
      RechargeAPIVersion.v2,
      payload
    );
    await vi.runAllTimersAsync();
    await promise;

    const captured = requests();
    expect(captured).toHaveLength(2);
    expect(await bodyOf(captured[0])).toBe(JSON.stringify(payload));
    expect(await bodyOf(captured[1])).toBe(JSON.stringify(payload));
  });

  it("throws after exhausting max retries", async () => {
    vi.useFakeTimers();
    mockedFetch.mockResolvedValue(fakeResponse({ status: 500 }));

    const promise = client
      .get(`${URL_BASE}/charges`, RechargeAPIVersion.v2)
      .catch((e: unknown) => e);
    await vi.runAllTimersAsync();
    const err = await promise;

    expect(err).toBeInstanceOf(RechargeAPIError);
    // initial attempt + 3 retries
    expect(mockedFetch).toHaveBeenCalledTimes(4);
  });

  it("does not leak retry state across sequential requests", async () => {
    vi.useFakeTimers();
    // First request needs one retry.
    mockedFetch
      .mockResolvedValueOnce(fakeResponse({ status: 429 }))
      .mockResolvedValueOnce(fakeResponse({ status: 200, body: { a: 1 } }));
    const p1 = client.get(`${URL_BASE}/charges`, RechargeAPIVersion.v2);
    await vi.runAllTimersAsync();
    await p1;

    // Second request should get a fresh retry budget: two 429s then success.
    mockedFetch
      .mockResolvedValueOnce(fakeResponse({ status: 429 }))
      .mockResolvedValueOnce(fakeResponse({ status: 429 }))
      .mockResolvedValueOnce(fakeResponse({ status: 200, body: { b: 2 } }));
    const p2 = client.get(`${URL_BASE}/charges`, RechargeAPIVersion.v2);
    await vi.runAllTimersAsync();
    const result = await p2;

    expect(result).toEqual({ b: 2 });
  });
});

describe("pagination", () => {
  it("follows v1 Link-header pagination and concatenates the response key", async () => {
    mockedFetch
      .mockResolvedValueOnce(
        fakeResponse({
          body: { addresses: [{ id: 1 }] },
          headers: {
            link: `<${URL_BASE}/addresses?page=2>; rel="next"`
          }
        })
      )
      .mockResolvedValueOnce(
        fakeResponse({ body: { addresses: [{ id: 2 }] } })
      );

    const result = await client.paginate(
      `${URL_BASE}/addresses`,
      RechargeAPIVersion.v1,
      "addresses"
    );
    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    expect(mockedFetch).toHaveBeenCalledTimes(2);
  });

  it("follows v2 cursor pagination, sending only cursor+limit after page one", async () => {
    mockedFetch
      .mockResolvedValueOnce(
        fakeResponse({
          body: { subscriptions: [{ id: 1 }], next_cursor: "abc" }
        })
      )
      .mockResolvedValueOnce(
        fakeResponse({ body: { subscriptions: [{ id: 2 }] } })
      );

    const result = await client.paginate(
      `${URL_BASE}/subscriptions`,
      RechargeAPIVersion.v2,
      "subscriptions",
      { status: "active", limit: "5" }
    );

    expect(result).toEqual([{ id: 1 }, { id: 2 }]);
    const captured = requests();
    // First page carries the filters.
    expect(captured[0].url).toContain("status=active");
    // Second page carries only cursor + limit (Recharge rejects other params).
    expect(captured[1].url).toContain("cursor=abc");
    expect(captured[1].url).toContain("limit=5");
    expect(captured[1].url).not.toContain("status=active");
  });
});
