import { z } from "zod";
import { Money, Property, ExternalId } from "~/models/api/common";

/**
 * A Recharge one-time product (2021-11).
 *
 * @see https://developer.rechargepayments.com/2021-11/onetimes/onetime_object
 */
export const Onetime = z.looseObject({
  id: z.number().optional(),
  address_id: z.number().nullable().optional(),
  customer_id: z.number().nullable().optional(),
  subscription_id: z.number().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  next_charge_scheduled_at: z.string().nullable().optional(),
  status: z.enum(["onetime"]).or(z.string()).nullable().optional(),
  is_cancelled: z.boolean().nullable().optional(),
  price: Money.nullable().optional(),
  quantity: z.number().nullable().optional(),
  product_title: z.string().nullable().optional(),
  variant_title: z.string().nullable().optional(),
  sku: z.string().nullable().optional(),
  sku_override: z.boolean().nullable().optional(),
  external_product_id: ExternalId.nullable().optional(),
  external_variant_id: ExternalId.nullable().optional(),
  presentment_currency: z.string().nullable().optional(),
  properties: z.array(Property).nullable().optional()
});
export type Onetime = z.infer<typeof Onetime>;

/** Envelope returned by single-onetime endpoints. */
export const OnetimeResponse = z.object({ onetime: Onetime });
export type OnetimeResponse = z.infer<typeof OnetimeResponse>;

/** Query parameters accepted by `GET /onetimes`. */
export const OnetimeListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  address_id: z.string().optional(),
  address_ids: z.string().optional(),
  customer_id: z.string().optional(),
  external_variant_id: z.string().optional(),
  external_product_id: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional()
});
export type OnetimeListParams = z.infer<typeof OnetimeListParams>;

/** Body for `POST /onetimes`. */
export const OnetimeCreate = z.looseObject({
  address_id: z.number().optional(),
  next_charge_scheduled_at: z.string().optional(),
  price: z.union([z.number(), z.string()]).optional(),
  product_title: z.string().optional(),
  quantity: z.number().optional(),
  external_variant_id: ExternalId.optional(),
  external_product_id: ExternalId.optional(),
  variant_title: z.string().optional(),
  sku: z.string().optional(),
  sku_override: z.boolean().optional(),
  properties: z.array(Property).optional()
});
export type OnetimeCreate = z.infer<typeof OnetimeCreate>;

/** Body for `PUT /onetimes/{id}`. */
export const OnetimeUpdate = z.looseObject({
  address_id: z.number().optional(),
  next_charge_scheduled_at: z.string().optional(),
  price: z.union([z.number(), z.string()]).optional(),
  product_title: z.string().optional(),
  quantity: z.number().optional(),
  external_variant_id: ExternalId.optional(),
  variant_title: z.string().optional(),
  sku: z.string().optional(),
  sku_override: z.boolean().optional(),
  properties: z.array(Property).optional()
});
export type OnetimeUpdate = z.infer<typeof OnetimeUpdate>;
