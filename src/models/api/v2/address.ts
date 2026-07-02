import { z } from "zod";
import { Money, OrderAttribute, DiscountSummary } from "~/models/api/common";

/** A shipping-line override on an address (2021-11). */
export const AddressShippingLineOverride = z.looseObject({
  code: z.string().nullable().optional(),
  price: Money.nullable().optional(),
  title: z.string().nullable().optional()
});
export type AddressShippingLineOverride = z.infer<
  typeof AddressShippingLineOverride
>;

/**
 * A Recharge address (2021-11).
 *
 * The standalone address entity is richer than the embedded `AddressSummary`:
 * it carries its own `id`, `customer_id`, `payment_method_id`, shipping
 * overrides, discounts, and order attributes.
 *
 * @see https://developer.rechargepayments.com/2021-11/addresses/addresses_object
 */
export const Address = z.looseObject({
  id: z.number(),
  customer_id: z.number(),
  payment_method_id: z.number().nullable().optional(),
  address1: z.string(),
  address2: z.string().nullable().optional(),
  city: z.string(),
  company: z.string().nullable().optional(),
  country_code: z.string().nullable().optional(),
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string().nullable().optional(),
  province: z.string().nullable().optional(),
  zip: z.string().nullable().optional(),
  order_note: z.string().nullable().optional(),
  presentment_currency: z.string().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
  order_attributes: z.array(OrderAttribute).nullable().optional(),
  discounts: z.array(DiscountSummary).nullable().optional(),
  shipping_lines_override: z
    .array(AddressShippingLineOverride)
    .nullable()
    .optional(),
  shipping_lines_conserved: z
    .array(AddressShippingLineOverride)
    .nullable()
    .optional()
});
export type Address = z.infer<typeof Address>;

/** Envelope returned by single-address endpoints. */
export const AddressResponse = z.object({ address: Address });
export type AddressResponse = z.infer<typeof AddressResponse>;

/** Query parameters accepted by `GET /addresses`. */
export const AddressListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  customer_id: z.string().optional(),
  discount_id: z.string().optional(),
  discount_code: z.string().optional(),
  is_active: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional()
});
export type AddressListParams = z.infer<typeof AddressListParams>;

/** Body for `POST /addresses`. */
export const AddressCreate = z.looseObject({
  customer_id: z.number().optional(),
  payment_method_id: z.number().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  company: z.string().optional(),
  country_code: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone: z.string().optional(),
  province: z.string().optional(),
  zip: z.string().optional(),
  order_note: z.string().optional(),
  presentment_currency: z.string().optional(),
  order_attributes: z.array(OrderAttribute).optional(),
  shipping_lines_override: z.array(AddressShippingLineOverride).optional()
});
export type AddressCreate = z.infer<typeof AddressCreate>;

/** Body for `PUT /addresses/{id}`. */
export const AddressUpdate = z.looseObject({
  payment_method_id: z.number().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  company: z.string().optional(),
  country_code: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone: z.string().optional(),
  province: z.string().optional(),
  zip: z.string().optional(),
  order_note: z.string().optional(),
  presentment_currency: z.string().optional(),
  order_attributes: z.array(OrderAttribute).optional(),
  shipping_lines_override: z.array(AddressShippingLineOverride).optional()
});
export type AddressUpdate = z.infer<typeof AddressUpdate>;

/** Body for `POST /addresses/merge`. */
export const AddressMergeBody = z.looseObject({
  target_address_id: z.number().optional(),
  source_address_ids: z.array(z.number()).optional(),
  delete_source_addresses: z.boolean().optional(),
  next_charge_date: z.string().optional()
});
export type AddressMergeBody = z.infer<typeof AddressMergeBody>;

/** Body for `POST /addresses/{id}/charges/skip`. */
export const AddressSkipFutureChargeBody = z.looseObject({
  date: z.string().optional(),
  subscription_ids: z.array(z.number()).optional()
});
export type AddressSkipFutureChargeBody = z.infer<
  typeof AddressSkipFutureChargeBody
>;

/**
 * Response for `POST /addresses/{id}/charges/skip`.
 *
 * @see https://developer.rechargepayments.com/2021-11/addresses/address_skip_future_charge
 */
export const AddressSkipFutureChargeResponse = z.looseObject({
  charges: z.array(z.looseObject({})).nullable().optional()
});
export type AddressSkipFutureChargeResponse = z.infer<
  typeof AddressSkipFutureChargeResponse
>;
