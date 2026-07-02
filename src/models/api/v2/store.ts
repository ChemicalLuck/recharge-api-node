import { z } from "zod";

/**
 * The store's checkout logo configuration.
 */
export const StoreCheckoutLogo = z.looseObject({
  src: z.string().nullable().optional()
});
export type StoreCheckoutLogo = z.infer<typeof StoreCheckoutLogo>;

/**
 * A Recharge store (2021-11).
 *
 * Only the `get` endpoint is modeled.
 *
 * @see https://developer.rechargepayments.com/2021-11/store/store_object
 */
export const Store = z.looseObject({
  id: z.number().nullable().optional(),
  name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  province: z.string().nullable().optional(),
  identifier: z.string().nullable().optional(),
  external_platform: z.string().nullable().optional(),
  checkout_platform: z.string().nullable().optional(),
  default_api_version: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  weight_unit: z.string().nullable().optional(),
  checkout_logo_url: z.unknown().nullable().optional(),
  customer_portal_base_url: z.unknown().nullable().optional(),
  merchant_portal_base_url: z.unknown().nullable().optional(),
  disabled_currencies_historical: z.array(z.string()).nullable().optional(),
  enabled_presentment_currencies: z.array(z.string()).nullable().optional(),
  enabled_presentment_currencies_symbols: z
    .array(
      z.looseObject({
        currency: z.string().nullable().optional(),
        location: z.string().nullable().optional(),
        suffix: z.string().nullable().optional(),
        symbol: z.string().nullable().optional()
      })
    )
    .nullable()
    .optional(),
  timezone: z
    .looseObject({
      iana_name: z.string().nullable().optional(),
      name: z.string().nullable().optional()
    })
    .nullable()
    .optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional()
});
export type Store = z.infer<typeof Store>;

/** Envelope returned by `GET /store`. */
export const StoreResponse = z.object({ store: Store });
export type StoreResponse = z.infer<typeof StoreResponse>;
