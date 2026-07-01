# tests — Vitest suite

Run with `npm test` (`vitest run`). Config: `../vitest.config.ts` (maps the `~`
alias to `src`, includes `tests/**/*.test.ts`). No network — everything is mocked.

## client.test.ts — HTTP behavior

Tests `RechargeClient` end-to-end by stubbing the **global `fetch`** and using
real `Request`/`Response` globals:

```typescript
const mockedFetch = vi.fn<typeof fetch>();
beforeEach(() => {
  mockedFetch.mockReset();
  vi.stubGlobal("fetch", mockedFetch);
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});
```

- `fakeResponse({ status, body, headers })` returns a real `Response` (body is
  `null` for 204/205/304).
- Inspect outgoing requests via `requests()` (the `Request` objects passed to
  fetch); read a request body with `await req.text()` and headers with
  `req.headers.get(...)`.
- **Retry tests use fake timers**: `vi.useFakeTimers()` then
  `await vi.runAllTimersAsync()` to advance past the retry back-off, then await
  the pending promise.

Covers: version header, body serialization, DELETE-with-body, 204/empty bodies,
`HTTPResponseError` (status + body), retry/backoff, per-request retry isolation,
body-preserved-on-retry, and both pagination strategies.

## resources.test.ts — request routing

Verifies every resource method issues the expected verb + URL (+ list key). Uses a
**fake client** injected into `new Recharge("token", fakeClient)` that records
calls instead of performing HTTP:

```typescript
const client = { get: vi.fn(...), post: vi.fn(...), /* ... */, paginate: vi.fn(...) }
  as unknown as RechargeClient;
```

Cases are declared as `[label, () => invoke(), verb, expectedUrl, listKey?]` tuples
fed to the `run()` helper. **When you add or change a resource method, add/adjust a
row here.**
