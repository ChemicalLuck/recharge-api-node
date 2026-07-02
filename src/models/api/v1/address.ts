import { z } from "zod";
import { Money, Property } from "~/models/api/common";

/** A shipping-line override on an address (2021-01). */
export const AddressShippingLine = z.looseObject({
  code: z.string().nullable().optional(),
  price: Money.nullable().optional(),
  title: z.string().nullable().optional()
});
export type AddressShippingLine = z.infer<typeof AddressShippingLine>;

/**
 * A Recharge address (2021-01).
 *
 * The standalone address entity is richer than the embedded `AddressSummary`:
 * it carries its own `id`, `customer_id`, discount reference, shipping
 * overrides, and note attributes.
 *
 * @see https://developer.rechargepayments.com/2021-01/addresses/addresses_object
 */
export const Address = z.looseObject({
  id: z.number(),
  customer_id: z.number(),
  address1: z.string(),
  address2: z.string().nullable().optional(),
  city: z.string(),
  company: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  country_code: z.string().nullable().optional(),
  first_name: z.string(),
  last_name: z.string(),
  phone: z.string().nullable().optional(),
  province: z.string().nullable().optional(),
  zip: z.string().nullable().optional(),
  cart_note: z.string().nullable().optional(),
  discount_id: z.number().nullable().optional(),
  presentment_currency: z.string().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
  note_attributes: z.array(Property).nullable().optional(),
  shipping_lines_override: z.array(AddressShippingLine).nullable().optional(),
  original_shipping_lines: z.array(AddressShippingLine).nullable().optional(),
  cart_attributes: z.array(Property).nullable().optional()
});
export type Address = z.infer<typeof Address>;

/** Envelope returned by single-address endpoints. */
export const AddressResponse = z.object({ address: Address });
export type AddressResponse = z.infer<typeof AddressResponse>;

/** Query parameters accepted by `GET /customers/{id}/addresses`. */
export const AddressListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  customer_id: z.string().optional(),
  discount_id: z.string().optional(),
  discount_code: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional()
});
export type AddressListParams = z.infer<typeof AddressListParams>;

/** Query parameters accepted by `GET /addresses/count`. */
export const AddressCountParams = z.looseObject({
  discount_id: z.string().optional(),
  discount_code: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional()
});
export type AddressCountParams = z.infer<typeof AddressCountParams>;

/** Body for `POST /customers/{id}/addresses`. */
export const AddressCreate = z.looseObject({
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  country_code: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone: z.string().optional(),
  province: z.string().optional(),
  zip: z.string().optional(),
  cart_note: z.string().optional(),
  discount_id: z.number().optional(),
  presentment_currency: z.string().optional(),
  note_attributes: z.array(Property).optional(),
  shipping_lines_override: z.array(AddressShippingLine).optional()
});
export type AddressCreate = z.infer<typeof AddressCreate>;

/** Body for `PUT /addresses/{id}`. */
export const AddressUpdate = z.looseObject({
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  country_code: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone: z.string().optional(),
  province: z.string().optional(),
  zip: z.string().optional(),
  cart_note: z.string().optional(),
  discount_id: z.number().optional(),
  presentment_currency: z.string().optional(),
  note_attributes: z.array(Property).optional(),
  shipping_lines_override: z.array(AddressShippingLine).optional()
});
export type AddressUpdate = z.infer<typeof AddressUpdate>;

/** Body for `POST /addresses/validate`. */
export const AddressValidateBody = z.looseObject({
  address1: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipcode: z.string().optional(),
  country: z.string().optional()
});
export type AddressValidateBody = z.infer<typeof AddressValidateBody>;

/**
 * Response for `POST /addresses/validate`.
 *
 * @see https://developer.rechargepayments.com/2021-01/addresses/addresses_validate
 */
export const AddressValidateResponse = z.looseObject({
  city: z.string().nullable().optional(),
  errors: z.looseObject({}).nullable().optional(),
  state: z.string().nullable().optional(),
  state_name: z.string().nullable().optional(),
  zip: z.string().nullable().optional()
});
export type AddressValidateResponse = z.infer<typeof AddressValidateResponse>;

/** Body for `POST /addresses/{id}/discounts`. */
export const AddressApplyDiscountBody = z.looseObject({
  discount_code: z.string().optional(),
  discount_id: z.number().optional()
});
export type AddressApplyDiscountBody = z.infer<typeof AddressApplyDiscountBody>;
