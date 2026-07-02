import { z } from "zod";
import { Image } from "~/models/api/common";

/**
 * Subscription defaults applied to a legacy catalog product (2021-01).
 */
export const ProductSubscriptionDefaults = z.looseObject({
  charge_interval_frequency: z.number().nullable().optional(),
  cutoff_day_of_month: z.number().nullable().optional(),
  cutoff_day_of_week: z.number().nullable().optional(),
  expire_after_specific_number_of_charges: z.number().nullable().optional(),
  modifiable_properties: z.array(z.string()).nullable().optional(),
  number_charges_until_expiration: z.number().nullable().optional(),
  order_day_of_month: z.number().nullable().optional(),
  order_day_of_week: z.number().nullable().optional(),
  order_interval_frequency_options: z.array(z.string()).nullable().optional(),
  order_interval_unit: z.string().nullable().optional(),
  storefront_purchase_options: z.string().nullable().optional()
});
export type ProductSubscriptionDefaults = z.infer<
  typeof ProductSubscriptionDefaults
>;

/**
 * A Recharge legacy catalog product (2021-01).
 *
 * @see https://developer.rechargepayments.com/2021-01/products/product_object
 */
export const Product = z.looseObject({
  collection_id: z.unknown().nullable().optional(),
  created_at: z.string().nullable().optional(),
  discount_amount: z.number().nullable().optional(),
  discount_type: z.string().nullable().optional(),
  handle: z.unknown().nullable().optional(),
  id: z.number().nullable().optional(),
  images: Image.nullable().optional(),
  product_id: z.number().nullable().optional(),
  shopify_product_id: z.number().nullable().optional(),
  subscription_defaults: ProductSubscriptionDefaults.nullable().optional(),
  title: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional()
});
export type Product = z.infer<typeof Product>;

/** Envelope returned by single-product endpoints. */
export const ProductResponse = z.object({ product: Product });
export type ProductResponse = z.infer<typeof ProductResponse>;

/** Query parameters accepted by `GET /products`. */
export const ProductListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  collection_id: z.string().optional(),
  shopify_product_ids: z.string().optional(),
  sort_by: z.string().optional(),
  title: z.string().optional()
});
export type ProductListParams = z.infer<typeof ProductListParams>;

/** Query parameters accepted by `GET /products/count`. */
export const ProductCountParams = z.looseObject({
  collection_id: z.string().optional(),
  shopify_product_ids: z.string().optional(),
  title: z.string().optional()
});
export type ProductCountParams = z.infer<typeof ProductCountParams>;

/** Body for `POST /products`. */
export const ProductCreateBody = z.looseObject({
  shopify_product_id: z.number().optional(),
  collection_id: z.number().optional(),
  discount_type: z.string().optional(),
  discount_amount: z.number().optional(),
  subscription_defaults: ProductSubscriptionDefaults.optional()
});
export type ProductCreateBody = z.infer<typeof ProductCreateBody>;

/** Body for `PUT /products/{id}`. */
export const ProductUpdateBody = z.looseObject({
  collection_id: z.number().optional(),
  discount_type: z.string().optional(),
  discount_amount: z.number().optional(),
  subscription_defaults: ProductSubscriptionDefaults.optional()
});
export type ProductUpdateBody = z.infer<typeof ProductUpdateBody>;
