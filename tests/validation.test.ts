import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { z } from "zod";
import RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  validate,
  defaultOnValidationError,
  type OnValidationError
} from "~/validation";

const URL_BASE = "https://api.rechargeapps.com";

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
  const bodyInit =
    status === 204 || status === 205 || status === 304 ? null : text;
  return new Response(bodyInit, { status, headers });
}

beforeEach(() => {
  mockedFetch.mockReset();
  vi.stubGlobal("fetch", mockedFetch);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("validate() helper", () => {
  const schema = z.object({ id: z.number() });

  it("returns parsed data on success", () => {
    const onError = vi.fn();
    const result = validate({ id: 1 }, schema, onError);
    expect(result).toEqual({ id: 1 });
    expect(onError).not.toHaveBeenCalled();
  });

  it("calls onError and returns raw data on failure", () => {
    const onError = vi.fn();
    const raw = { id: "not-a-number" };
    const result = validate(raw, schema, onError, "GET /things/1");
    expect(result).toBe(raw);
    expect(onError).toHaveBeenCalledTimes(1);
    const info = onError.mock.calls[0][0];
    expect(info.context).toBe("GET /things/1");
    expect(info.raw).toBe(raw);
    expect(info.issues.length).toBeGreaterThan(0);
  });

  it("passes raw through unchanged when no schema is supplied", () => {
    const onError = vi.fn();
    const raw = { anything: true };
    expect(validate(raw, undefined, onError)).toBe(raw);
    expect(onError).not.toHaveBeenCalled();
  });

  it("preserves unknown keys for loose object schemas", () => {
    const loose = z.looseObject({ id: z.number() });
    const result = validate({ id: 1, extra: "keep" }, loose, vi.fn());
    expect(result).toEqual({ id: 1, extra: "keep" });
  });
});

describe("defaultOnValidationError", () => {
  it("logs a warning", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    defaultOnValidationError({ context: "GET /x", issues: [], raw: {} });
    expect(warn).toHaveBeenCalledOnce();
    warn.mockRestore();
  });
});

describe("RechargeClient response validation", () => {
  const schema = z.object({ charge: z.object({ id: z.number() }) });

  it("returns validated data on a matching body", async () => {
    mockedFetch.mockResolvedValue(
      fakeResponse({ body: { charge: { id: 1 } } })
    );
    const client = new RechargeClient("t");
    const result = await client.get(
      `${URL_BASE}/charges/1`,
      RechargeAPIVersion.v2,
      undefined,
      schema
    );
    expect(result).toEqual({ charge: { id: 1 } });
  });

  it("warns via onValidationError and returns raw on drift, without throwing", async () => {
    const onValidationError: OnValidationError = vi.fn();
    const raw = { charge: { id: "drifted" } };
    mockedFetch.mockResolvedValue(fakeResponse({ body: raw }));
    const client = new RechargeClient("t", { onValidationError });

    const result = await client.get(
      `${URL_BASE}/charges/1`,
      RechargeAPIVersion.v2,
      undefined,
      schema
    );

    expect(result).toEqual(raw);
    expect(onValidationError).toHaveBeenCalledTimes(1);
    expect(
      (onValidationError as ReturnType<typeof vi.fn>).mock.calls[0][0].context
    ).toBe(`GET ${URL_BASE}/charges/1`);
  });

  it("skips validation and returns undefined on 204 with a schema present", async () => {
    const onValidationError = vi.fn();
    mockedFetch.mockResolvedValue(fakeResponse({ status: 204 }));
    const client = new RechargeClient("t", { onValidationError });
    const result = await client.delete(
      `${URL_BASE}/charges/1`,
      RechargeAPIVersion.v2,
      undefined,
      schema
    );
    expect(result).toBeUndefined();
    expect(onValidationError).not.toHaveBeenCalled();
  });

  it("skips validation on an empty 200 body", async () => {
    const onValidationError = vi.fn();
    mockedFetch.mockResolvedValue(fakeResponse({ status: 200, body: "" }));
    const client = new RechargeClient("t", { onValidationError });
    const result = await client.post(
      `${URL_BASE}/charges/1/skip`,
      RechargeAPIVersion.v2,
      undefined,
      schema
    );
    expect(result).toBeUndefined();
    expect(onValidationError).not.toHaveBeenCalled();
  });

  it("bypasses validation entirely when validate:false", async () => {
    const onValidationError = vi.fn();
    const raw = { charge: { id: "drifted" } };
    mockedFetch.mockResolvedValue(fakeResponse({ body: raw }));
    const client = new RechargeClient("t", {
      onValidationError,
      validate: false
    });
    const result = await client.get(
      `${URL_BASE}/charges/1`,
      RechargeAPIVersion.v2,
      undefined,
      schema
    );
    expect(result).toEqual(raw);
    expect(onValidationError).not.toHaveBeenCalled();
  });

  it("validates each paginated item, returning all rows even when one drifts", async () => {
    const onValidationError = vi.fn();
    const item = z.object({ id: z.number() });
    mockedFetch.mockResolvedValue(
      fakeResponse({ body: { charges: [{ id: 1 }, { id: "bad" }] } })
    );
    const client = new RechargeClient("t", { onValidationError });
    const result = await client.paginate(
      `${URL_BASE}/charges`,
      RechargeAPIVersion.v2,
      "charges",
      undefined,
      item
    );
    expect(result).toEqual([{ id: 1 }, { id: "bad" }]);
    expect(onValidationError).toHaveBeenCalledTimes(1);
    expect(onValidationError.mock.calls[0][0].context).toBe("charges[1]");
  });
});
