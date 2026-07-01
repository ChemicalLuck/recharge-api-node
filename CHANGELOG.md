# Changelog

All notable changes to this project are documented in this file.

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
