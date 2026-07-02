# Changelog

All notable changes to this project are documented in this file.

## 1.3.0

### Added

- **Fully typed, runtime-validated responses.** Every v1/v2 resource method now
  returns a concrete type instead of `Promise<unknown>` — single-record endpoints
  return their response envelope (e.g. `{ charge: Charge }`), `list` methods return
  `Entity[]`, and `delete`/void endpoints return `undefined`. Request bodies and
  list query params are typed too.
- **Zod schemas + inferred types** for every resource, exported (namespaced to
  avoid v1/v2 name clashes) as `v1Models` and `v2Models`, plus shared leaf
  fragments (e.g. `Money`, `AddressSummary`, `LineItem`). Types are derived from
  the schemas via `z.infer`, so schema and type never drift apart.
- **Non-throwing response validation.** Responses are validated against their
  schema at runtime; on a mismatch (schema drift, renamed/missing fields) the
  configurable `onValidationError` handler is called (default `console.warn`) and
  the **raw** data is still returned — validation never throws. Configure via the
  new `RechargeClient`/`Recharge` options:
  `new Recharge(apiKey, { onValidationError, validate })`. Set `validate: false` to
  skip runtime validation entirely (types still apply). Object schemas are `loose`,
  so unknown keys the API adds are preserved rather than dropped.

### Changed

- **Added a runtime dependency on [`zod`](https://zod.dev)** (v4). The package is
  no longer dependency-free; `zod` is a peer of the validation layer and is marked
  `external` in the build so consumers dedupe a single copy.

## 1.2.0

### Changed

- **Dropped the `node-fetch` dependency** — the client now uses the global
  `fetch`/`Request`/`Response` built into Node.js 20+. The package has no runtime
  dependencies.
- **Migrated to ESLint 9 flat config** (`eslint.config.js`) with
  `typescript-eslint` v8; removed the legacy `.eslintrc.cjs`.

### Added

- **TSDoc doc comments** across the whole library (client, base resource, entry
  point, models, and every v1/v2 resource method — including HTTP verb/path,
  params, and returns), surfaced in the generated `.d.ts`.
- **`CLAUDE.md`** guides at the repo root, `src/api/`, and `tests/`.

## 1.1.0

### Fixed

- **API version header** — requests now send the correct `X-Recharge-Version` header
  instead of the unrecognised `X-Recharge-API-Version`. Previously every request silently
  fell back to the store's default API version (usually 2021-01), so `v2` (2021-11) calls
  were not actually served by the 2021-11 API.
- **Retry state** is now tracked per request instead of on the shared client instance,
  fixing premature "Max retries reached" failures and incorrect behaviour under
  concurrent requests.
- **Request body on retry** — a fresh request is built for each attempt, so `POST`/`PUT`
  bodies are no longer lost when a request is retried.
- **Empty / `204` responses** (many `delete` and action endpoints) now resolve to
  `undefined` instead of throwing a JSON parse error.
- **`v2.token`** now targets `/token_information` (was `/token_info`).
- **`v2.asyncBatch`** now targets `/async_batches` (was `/batch`) and reads the
  `async_batches` list key.
- **`v2.notification.sendEmail`** now targets `/notifications` (was `/notifications/send_email`).
- **`v2` cursor pagination** now sends only `cursor` (and `limit`) on subsequent pages, as
  required by the 2021-11 API, instead of resending the original filters.

### Added

- **`v2.entitlement`** resource (`create`, `update`, `delete`, `list`).
- **`v2.subscription.gift`** — `POST /subscriptions/{id}/gift`.
- **`HTTPResponseError`** now exposes `status` and the parsed `body` of the error response.
- **`Retry-After`** header is honoured for retry back-off when present.
- **Test suite** (Vitest) covering the client (retries, pagination, error handling, empty
  responses) and every resource's request routing, plus a CI workflow running lint, build,
  and tests on Node 20 and 24.
- **`engines`** field declaring Node.js `>=20`.

### Security

- Updated dev dependencies to clear reported advisories (`js-yaml`, `esbuild`/`vite` via
  Vitest). Remaining advisories are limited to the esbuild dev server, which this package
  does not run.
