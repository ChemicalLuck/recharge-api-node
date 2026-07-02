# src/api — resource classes

Each file is one Recharge resource. `v1/` targets API version **2021-01**, `v2/`
targets **2021-11**. Both are re-exported from their directory's `index.ts` barrel
and wired into the `Recharge` facade in `../index.ts`.

## Anatomy of a resource

```typescript
import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  Charge,
  ChargeResponse,
  type ChargeListParams
} from "~/models/api/v2/charge";
import RechargeResource from "../resource";

class ChargeResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "charges"; // URL path segment
    this.rechargeVersion = RechargeAPIVersion.v2; // v1 or v2
  }

  get(chargeId: number): Promise<ChargeResponse> {
    return this._get(`${this.url}/${chargeId}`, undefined, ChargeResponse);
  }

  list(query?: ChargeListParams): Promise<Charge[]> {
    // 2nd arg = response key, 4th = item schema (validates each element)
    return this._paginate(
      `${this.url}`,
      "charges",
      query as Record<string, string> | undefined,
      Charge
    );
  }
}

export { ChargeResource };
```

- `this.url` is `https://api.rechargeapps.com/<resource>`.
- Use `_get/_post/_put/_delete(url, body?/query?, schema?)` for single requests and
  `_paginate(url, key, query?, itemSchema?)` for list endpoints — `key` is the JSON
  property holding the array (e.g. `"charges"`, `"async_batches"`). These live on
  `RechargeResource` (`../resource.ts`) and automatically apply the correct version
  header and pagination strategy.
- **Return types are concrete.** Schemas live in `src/models/api/{common,v1,v2}/`
  (schema-first: `export const X = z.looseObject({...}); export type X = z.infer<typeof X>`).
  Single-record methods return the response envelope `Promise<XResponse>` (e.g.
  `{ charge: Charge }`) and pass `XResponse` as the schema; `list` returns
  `Promise<X[]>` and passes the bare item schema `X`; `delete`/void endpoints return
  `Promise<undefined>` with no schema. Request bodies and list params are typed too —
  input-body/param fields are all optional so `{}` stays valid.
- Validation is non-throwing (see `src/validation.ts`): a response that doesn't match
  its schema triggers `onValidationError` (default `console.warn`) and the raw data is
  returned anyway. Never make schemas strict enough to reject real API data — prefer
  `.nullable().optional()` and `z.looseObject`.

## Adding a resource or endpoint

1. Add the schema in `src/models/api/{v1,v2}/<resource>.ts` (entity `X`, envelope
   `XResponse`, `XListParams`, request bodies) and export it from that directory's
   `index.ts` barrel. Then create/extend the resource file in `v1/` and/or `v2/`,
   set `resource`/`rechargeVersion`, add methods on the documented path, and pass
   the matching schema as the trailing `_get/_post/...`/`_paginate` argument.
2. For a new resource: export it from the `src/api/<version>/index.ts` barrel, then
   add a field + constructor assignment in the matching `RechargeV1`/`RechargeV2`
   class in `../index.ts`.
3. Add TSDoc: one class summary with a `@see` doc link, and per-method a verb+path
   line, `@param`s, and `@returns` (match the existing files' style).
4. Add smoke-test rows in `tests/resources.test.ts` asserting the verb + URL
   (and list response key).
5. Update the resource tables in `README.md`.

## Watch out

- **v1 and v2 share REST paths**; only the version header differs. When in doubt,
  cross-check the other version's file — a divergence is usually a typo bug (this
  is how the 1.1.0 `token_information` / `async_batches` / `notifications` fixes
  were found).
- Action endpoints use their real path segment, which may differ from the method
  name (e.g. `charge.capture` → `/capture_payment`,
  `subscription.setNextChargeDate` → `/set_next_charge_date`).
- A few methods hit `this.baseUrl` (API root) rather than `this.url` — e.g.
  `credit.listAllAdjustments` → `/credit_adjustments`, and v1 address/discount
  cross-resource actions. Keep those as-is.
- `event`, `store`, `token`, `notification` are intentionally partial (not full CRUD).
