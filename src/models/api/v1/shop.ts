import { z } from "zod";

/**
 * A Recharge shop (2021-01).
 *
 * Only the `get` and `shipping_countries` endpoints are modeled.
 *
 * @see https://developer.rechargepayments.com/2021-01/shop/shop_object
 */
export const Shop = z.looseObject({
  checkout_logo_url: z.string().nullable().optional()
});
export type Shop = z.infer<typeof Shop>;

/** Envelope returned by `GET /shop`. */
export const ShopResponse = z.object({ shop: Shop });
export type ShopResponse = z.infer<typeof ShopResponse>;

/** A single shipping country entry as returned by the shop endpoint. */
export const ShippingCountry = z.looseObject({
  id: z.number().nullable().optional(),
  code: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  country_id: z.number().nullable().optional(),
  provinces: z
    .array(
      z.looseObject({
        id: z.number().nullable().optional(),
        code: z.string().nullable().optional(),
        name: z.string().nullable().optional()
      })
    )
    .nullable()
    .optional()
});
export type ShippingCountry = z.infer<typeof ShippingCountry>;

/** Envelope returned by `GET /shop/shipping_countries`. */
export const ShopShippingCountriesResponse = z.looseObject({
  shipping_countries: z.array(ShippingCountry).nullable().optional()
});
export type ShopShippingCountriesResponse = z.infer<
  typeof ShopShippingCountriesResponse
>;
