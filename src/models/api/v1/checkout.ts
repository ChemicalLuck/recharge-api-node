import { z } from "zod";
import { Money, AnalyticsData } from "~/models/api/common";

/**
 * Billing/shipping address as embedded on a 2021-01 checkout.
 */
export const CheckoutAddress = z.looseObject({
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  address1: z.string().nullable().optional(),
  address2: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  province: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  country_code: z.string().nullable().optional(),
  zip: z.string().nullable().optional(),
  phone: z.string().nullable().optional()
});
export type CheckoutAddress = z.infer<typeof CheckoutAddress>;

/**
 * Product image URLs as embedded on a 2021-01 checkout line item.
 */
export const CheckoutLineItemImages = z.looseObject({
  small: z.string().nullable().optional(),
  medium: z.string().nullable().optional(),
  large: z.string().nullable().optional(),
  original: z.string().nullable().optional()
});
export type CheckoutLineItemImages = z.infer<typeof CheckoutLineItemImages>;

/**
 * A line-item property (name/value pair) on a 2021-01 checkout.
 */
export const CheckoutLineItemProperty = z.looseObject({
  name: z.string().nullable().optional(),
  value: z.string().nullable().optional()
});
export type CheckoutLineItemProperty = z.infer<typeof CheckoutLineItemProperty>;

/**
 * A line item as embedded on a 2021-01 checkout.
 */
export const CheckoutLineItem = z.looseObject({
  id: z.number().nullable().optional(),
  charge_interval_frequency: z.number().nullable().optional(),
  cutoff_day_of_month: z.number().nullable().optional(),
  cutoff_day_of_week: z.number().nullable().optional(),
  expire_after_specific_number_of_charges: z.number().nullable().optional(),
  first_recurring_charge_delay: z.number().nullable().optional(),
  fulfillment_service: z.string().nullable().optional(),
  grams: z.number().nullable().optional(),
  handle: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  line_price: Money.nullable().optional(),
  order_day_of_month: z.number().nullable().optional(),
  order_day_of_week: z.number().nullable().optional(),
  order_interval_frequency: z.number().nullable().optional(),
  order_interval_unit: z.string().nullable().optional(),
  order_interval_unit_type: z.string().nullable().optional(),
  original_price: Money.nullable().optional(),
  price: Money.nullable().optional(),
  product_id: z.number().nullable().optional(),
  product_type: z.string().nullable().optional(),
  product_title: z.string().nullable().optional(),
  properties: z.array(CheckoutLineItemProperty).nullable().optional(),
  quantity: z.number().nullable().optional(),
  recurring_price: Money.nullable().optional(),
  requires_shipping: z.boolean().nullable().optional(),
  sku: z.string().nullable().optional(),
  tax_code: z.string().nullable().optional(),
  taxable: z.boolean().nullable().optional(),
  title: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  variant_id: z.number().nullable().optional(),
  variant_title: z.string().nullable().optional(),
  vendor: z.string().nullable().optional(),
  images: CheckoutLineItemImages.nullable().optional()
});
export type CheckoutLineItem = z.infer<typeof CheckoutLineItem>;

/**
 * A shipping rate as embedded on a 2021-01 checkout (also the shape returned by
 * `GET /checkouts/{token}/shipping_rates`).
 */
export const CheckoutShippingRate = z.looseObject({
  checkout: z
    .looseObject({
      subtotal_price: Money.nullable().optional(),
      total_price: Money.nullable().optional(),
      total_tax: Money.nullable().optional()
    })
    .nullable()
    .optional(),
  code: z.string().nullable().optional(),
  delivery_range: z.array(z.string()).nullable().optional(),
  description: z.string().nullable().optional(),
  handle: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  phone_required: z.boolean().nullable().optional(),
  price: Money.nullable().optional(),
  tax_lines: z.array(z.looseObject({})).nullable().optional(),
  title: z.string().nullable().optional()
});
export type CheckoutShippingRate = z.infer<typeof CheckoutShippingRate>;

/**
 * A tax line as embedded on a 2021-01 checkout.
 */
export const CheckoutTaxLine = z.looseObject({
  price: Money.nullable().optional(),
  rate: z.number().nullable().optional(),
  title: z.string().nullable().optional()
});
export type CheckoutTaxLine = z.infer<typeof CheckoutTaxLine>;

/**
 * A discount as embedded on a 2021-01 checkout.
 */
export const CheckoutDiscount = z.looseObject({
  code: z.string().nullable().optional(),
  amount: Money.nullable().optional(),
  type: z.string().nullable().optional()
});
export type CheckoutDiscount = z.infer<typeof CheckoutDiscount>;

/**
 * The `applied_discount` object embedded on a 2021-01 checkout.
 */
export const CheckoutAppliedDiscount = z.looseObject({
  amount: Money.nullable().optional(),
  applicable: z.boolean().nullable().optional(),
  non_applicable_reason: z.string().nullable().optional(),
  value: Money.nullable().optional(),
  value_type: z.string().nullable().optional()
});
export type CheckoutAppliedDiscount = z.infer<typeof CheckoutAppliedDiscount>;

/**
 * A Recharge checkout (2021-01).
 *
 * @see https://developer.rechargepayments.com/2021-01/checkouts/checkout_object
 */
export const Checkout = z.looseObject({
  token: z.string().nullable().optional(),
  charge_id: z.number().nullable().optional(),
  completed_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
  note_attributes: z.unknown().nullable().optional(),
  discount_code: z.string().nullable().optional(),
  buyer_accepts_marketing: z.boolean().nullable().optional(),
  requires_shipping: z.boolean().nullable().optional(),
  taxes_included: z.boolean().nullable().optional(),
  taxable: z.boolean().nullable().optional(),
  payment_processor: z.string().nullable().optional(),
  payment_processor_customer_id: z.string().nullable().optional(),
  payment_processor_transaction_id: z.string().nullable().optional(),
  charge_processed_at: z.string().nullable().optional(),
  external_checkout_id: z.string().nullable().optional(),
  external_checkout_source: z.string().nullable().optional(),
  external_customer_id: z.string().nullable().optional(),
  external_transaction_id: z.string().nullable().optional(),
  subtotal_price: Money.nullable().optional(),
  total_line_items_price: Money.nullable().optional(),
  total_discounts: Money.nullable().optional(),
  total_price: Money.nullable().optional(),
  total_tax: Money.nullable().optional(),
  total_weight: z.number().nullable().optional(),
  applied_discount: CheckoutAppliedDiscount.nullable().optional(),
  billing_address: CheckoutAddress.nullable().optional(),
  shipping_address: CheckoutAddress.nullable().optional(),
  shipping_address_validations: z
    .looseObject({
      country_is_supported: z.boolean().nullable().optional(),
      ups: z.boolean().nullable().optional()
    })
    .nullable()
    .optional(),
  shipping_line: CheckoutShippingRate.nullable().optional(),
  shipping_rate: CheckoutShippingRate.nullable().optional(),
  analytics_data: AnalyticsData.nullable().optional(),
  line_items: z.array(CheckoutLineItem).nullable().optional(),
  shipping_lines: z.array(CheckoutShippingRate).nullable().optional(),
  tax_lines: z.array(CheckoutTaxLine).nullable().optional(),
  discounts: z.array(CheckoutDiscount).nullable().optional(),
  discount_codes: z.array(CheckoutDiscount).nullable().optional()
});
export type Checkout = z.infer<typeof Checkout>;

/**
 * A Recharge checkout charge (2021-01), returned by
 * `POST /checkouts/{token}/charge`.
 *
 * @see https://developer.rechargepayments.com/2021-01/checkouts/checkout_charge
 */
export const CheckoutCharge = z.looseObject({
  authorization_token: z.string().nullable().optional(),
  charge_id: z.number().nullable().optional(),
  free: z.boolean().nullable().optional(),
  payment_processor: z.string().nullable().optional(),
  payment_processor_customer_id: z.string().nullable().optional(),
  payment_processor_transaction_id: z.string().nullable().optional(),
  payment_token: z.string().nullable().optional(),
  payment_type: z.string().nullable().optional(),
  status: z.string().nullable().optional()
});
export type CheckoutCharge = z.infer<typeof CheckoutCharge>;

/** Envelope returned by single-checkout endpoints. */
export const CheckoutResponse = z.object({ checkout: Checkout });
export type CheckoutResponse = z.infer<typeof CheckoutResponse>;

/** Best-effort envelope returned by `GET /checkouts/{token}/shipping_rates`. */
export const CheckoutShippingRatesResponse = z.looseObject({
  shipping_rates: z.array(CheckoutShippingRate).nullable().optional()
});
export type CheckoutShippingRatesResponse = z.infer<
  typeof CheckoutShippingRatesResponse
>;

/** Best-effort envelope returned by `POST /checkouts/{token}/charge`. */
export const CheckoutChargeResponse = z.looseObject({
  checkout_charge: z.looseObject({}).nullable().optional(),
  checkout: Checkout.nullable().optional()
});
export type CheckoutChargeResponse = z.infer<typeof CheckoutChargeResponse>;

/** Body for `POST /checkouts`. */
export const CheckoutCreateBody = z.looseObject({
  line_items: z.array(z.looseObject({})).optional(),
  email: z.string().optional(),
  shipping_address: CheckoutAddress.optional(),
  billing_address: CheckoutAddress.optional(),
  note: z.string().optional(),
  buyer_accepts_marketing: z.boolean().optional(),
  external_checkout_id: z.string().optional(),
  external_checkout_source: z.string().optional()
});
export type CheckoutCreateBody = z.infer<typeof CheckoutCreateBody>;

/** Body for `PUT /checkouts/{token}`. */
export const CheckoutUpdateBody = z.looseObject({
  line_items: z.array(z.looseObject({})).optional(),
  email: z.string().optional(),
  shipping_address: CheckoutAddress.optional(),
  billing_address: CheckoutAddress.optional(),
  shipping_line: z.looseObject({}).optional(),
  note: z.string().optional(),
  buyer_accepts_marketing: z.boolean().optional(),
  discount_code: z.string().optional()
});
export type CheckoutUpdateBody = z.infer<typeof CheckoutUpdateBody>;

/** Body for `POST /checkouts/{token}/charge`. */
export const CheckoutChargeBody = z.looseObject({
  payment_processor: z.string().optional(),
  payment_token: z.string().optional(),
  payment_type: z.string().optional(),
  free: z.boolean().optional()
});
export type CheckoutChargeBody = z.infer<typeof CheckoutChargeBody>;
