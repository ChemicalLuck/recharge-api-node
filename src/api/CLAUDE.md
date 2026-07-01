# src/api — resource classes

Each file is one Recharge resource. `v1/` targets API version **2021-01**, `v2/`
targets **2021-11**. Both are re-exported from their directory's `index.ts` barrel
and wired into the `Recharge` facade in `../index.ts`.

## Anatomy of a resource

```typescript
import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class ChargeResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "charges"; // URL path segment
    this.rechargeVersion = RechargeAPIVersion.v2; // v1 or v2
  }

  get(chargeId: number): Promise<unknown> {
    return this._get(`${this.url}/${chargeId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "charges", query); // 2nd arg = response key
  }
}

export { ChargeResource };
```

- `this.url` is `https://api.rechargeapps.com/<resource>`.
- Use `_get/_post/_put/_delete` for single requests and `_paginate(url, key, query)`
  for list endpoints — `key` is the JSON property holding the array (e.g.
  `"charges"`, `"async_batches"`). These live on `RechargeResource` (`../resource.ts`)
  and automatically apply the correct version header and pagination strategy.
- Return type is `Promise<unknown>` throughout (no response typings yet).

## Adding a resource or endpoint

1. Create/extend the file in `v1/` and/or `v2/`. Set `resource` and
   `rechargeVersion`. Add methods that build the exact documented path.
2. For a new resource: export it from the directory `index.ts`, then add a field +
   constructor assignment in the matching `RechargeV1`/`RechargeV2` class in
   `../index.ts`.
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
