# recharge-api-node — agent guide

TypeScript client for the **Recharge Payments API**, covering both API versions:
`v1` = **2021-01**, `v2` = **2021-11**. Published to npm as
`@chemicalluck/recharge-api-node`. ESM + CJS dual build with type declarations.

## Commands

- `npm run build` — bundle with tsup → `dist/` (ESM `.js`, CJS `.cjs`, `.d.ts`/`.d.cts`).
- `npm test` — run the Vitest suite (`tests/**/*.test.ts`).
- `npm run test:watch` — Vitest in watch mode.
- `npm run lint` — ESLint 9 flat config (`eslint.config.js`) over `src`.
- `npm run format:all` — Prettier (runs automatically on pre-commit via husky).

Requires **Node ≥ 20** (`engines`). There are **no runtime dependencies** — the
client uses the global `fetch`/`Request`/`Response` built into Node 20+.

## Architecture

```
src/
  index.ts            Recharge facade → exposes `.v1` and `.v2` resource namespaces
  client.ts           RechargeClient: HTTP, auth, retries, pagination, errors
  api/
    resource.ts       RechargeResource base class (all resources extend it)
    v1/               2021-01 resource classes (+ barrel index.ts)
    v2/               2021-11 resource classes (+ barrel index.ts)
  models/             RechargeAPIVersion, RequestMethod, error classes
```

- `Recharge` (in `index.ts`) constructs one `RechargeClient` shared by both
  version namespaces. `new Recharge(apiKey)` is the public entry point;
  `new Recharge(apiKey, client)` injects a client (used by tests).
- Resources are thin: each method builds a URL from `this.url` and delegates to
  `_get/_post/_put/_delete/_paginate` on the base class.

## Conventions & gotchas

- **Version header is `X-Recharge-Version`** (NOT `X-Recharge-API-Version`). An
  unrecognised header makes Recharge silently fall back to the store's default
  version — see the 1.1.0 fix. `RechargeClient` sets it per request from the
  resource's `rechargeVersion`.
- **Pagination differs by version**: 2021-01 uses `Link` headers; 2021-11 uses a
  `next_cursor` cursor. On 2021-11, only `cursor` (+ `limit`) may be sent on
  pages after the first — other filters are rejected by the API.
- **204 / empty bodies** resolve to `undefined` (not a JSON parse error).
- **`DELETE` may carry a body** (e.g. `collection.removeProducts`,
  `plan.bulkDelete`) — this is intentional; do not "fix" it away.
- Errors: non-2xx throws `HTTPResponseError` with `.status` and parsed `.body`.
  Retries happen automatically on `429`/`5xx` (honours `Retry-After`).
- v1 and v2 share the same REST paths (only the version header differs). If a
  path looks wrong in one version, check the other — they should match.
- Docs: 2021-01 <https://developer.rechargepayments.com/2021-01/>,
  2021-11 <https://developer.rechargepayments.com/2021-11/>.

## Release

Manual, tag-triggered. Bump `version` in `package.json`, update `CHANGELOG.md`,
commit, then push a `v*` tag — `.github/workflows/publish.yml` creates the
GitHub release and runs `npm publish` via **npm trusted publishing (OIDC)**.
The `id-token: write` permission in that workflow is required for OIDC; do not
remove it. CI (`.github/workflows/ci.yml`) runs lint + build + test on Node 20 & 24.
