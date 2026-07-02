import { z } from "zod";
import {
  Money,
  AddressSummary,
  ShippingLine,
  TaxLine,
  AnalyticsData,
  ExternalId,
  Image,
  Property
} from "~/models/api/common";

/**
 * The per-line-item subscription preferences embedded on a 2021-11 checkout.
 */
export const CheckoutSubscriptionPreferences = z.looseObject({
  charge_delay: z.unknown().nullable().optional(),
  charge_interval_frequency: z.number().nullable().optional(),
  charge_on_day_of_month: z.number().nullable().optional(),
  charge_on_day_of_week: z.number().nullable().optional(),
  cutoff_day_of_month: z.number().nullable().optional(),
  cutoff_day_of_week: z.number().nullable().optional(),
  expire_after_specific_number_of_charges: z.number().nullable().optional(),
  interval_unit: z.string().nullable().optional(),
  number_charges_until_expiration: z.number().nullable().optional(),
  order_day_of_month: z.number().nullable().optional(),
  order_day_of_week: z.number().nullable().optional(),
  order_interval_frequency: z.number().nullable().optional(),
  shipping_interval_frequency: z.number().nullable().optional(),
  shipping_interval_unit_type: z.string().nullable().optional()
});
export type CheckoutSubscriptionPreferences = z.infer<
  typeof CheckoutSubscriptionPreferences
>;

/**
 * A line item as embedded on a 2021-11 checkout.
 */
export const CheckoutLineItem = z.looseObject({
  id: z.number().nullable().optional(),
  charge_interval_frequency: z.number().nullable().optional(),
  cutoff_day_of_month: z.number().nullable().optional(),
  cutoff_day_of_week: z.number().nullable().optional(),
  expire_after_specific_number_of_charges: z.number().nullable().optional(),
  external_inventory_policy: z.string().nullable().optional(),
  external_product_id: ExternalId.nullable().optional(),
  external_variant_id: ExternalId.nullable().optional(),
  first_recurring_charge_delay: z.number().nullable().optional(),
  fulfillment_service: z.string().nullable().optional(),
  handle: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  images: Image.nullable().optional(),
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
  properties: z.array(Property).nullable().optional(),
  purchase_item_type: z.string().nullable().optional(),
  quantity: z.number().nullable().optional(),
  recurring_price: Money.nullable().optional(),
  recurring_unit_price: Money.nullable().optional(),
  requires_shipping: z.boolean().nullable().optional(),
  sku: z.string().nullable().optional(),
  subscription_preferences:
    CheckoutSubscriptionPreferences.nullable().optional(),
  tax_code: z.string().nullable().optional(),
  tax_lines: z.array(TaxLine).nullable().optional(),
  taxable: z.boolean().nullable().optional(),
  title: z.string().nullable().optional(),
  total_price: Money.nullable().optional(),
  type: z.string().nullable().optional(),
  unit_price: Money.nullable().optional(),
  variant_id: z.number().nullable().optional(),
  variant_title: z.string().nullable().optional(),
  vendor: z.string().nullable().optional(),
  weight: z.number().nullable().optional(),
  weight_unit: z.string().nullable().optional()
});
export type CheckoutLineItem = z.infer<typeof CheckoutLineItem>;

/**
 * A shipping rate as embedded on a 2021-11 checkout (also the shape returned by
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
  tax_lines: z.array(TaxLine).nullable().optional(),
  title: z.string().nullable().optional()
});
export type CheckoutShippingRate = z.infer<typeof CheckoutShippingRate>;

/**
 * A discount as embedded on a 2021-11 checkout.
 */
export const CheckoutDiscount = z.looseObject({
  amount: Money.nullable().optional(),
  applicable: z.boolean().nullable().optional(),
  non_applicable_reason: z.string().nullable().optional(),
  value: Money.nullable().optional(),
  value_type: z.string().nullable().optional()
});
export type CheckoutDiscount = z.infer<typeof CheckoutDiscount>;

/**
 * An applied discount as embedded on a 2021-11 checkout `applied_discounts`
 * array.
 */
export const CheckoutAppliedDiscount = z.looseObject({
  amount: Money.nullable().optional(),
  applicable: z.boolean().nullable().optional(),
  discount_code: z.string().nullable().optional(),
  non_redeemable_reason: z.string().nullable().optional(),
  value: Money.nullable().optional(),
  value_type: z.string().nullable().optional()
});
export type CheckoutAppliedDiscount = z.infer<typeof CheckoutAppliedDiscount>;

/**
 * A shipping line as embedded on a 2021-11 checkout.
 */
export const CheckoutShippingLine = z.looseObject({
  code: z.string().nullable().optional(),
  price: Money.nullable().optional(),
  tax_lines: z.array(TaxLine).nullable().optional(),
  taxable: z.boolean().nullable().optional(),
  title: z.string().nullable().optional()
});
export type CheckoutShippingLine = z.infer<typeof CheckoutShippingLine>;

/**
 * A single opt-in/opt-out notification channel status embedded on a 2021-11
 * checkout's `notification_preferences`.
 */
export const CheckoutNotificationChannel = z.looseObject({
  last_opt_in_at: z.string().nullable().optional(),
  last_opt_in_source: z.string().nullable().optional(),
  last_opt_out_at: z.string().nullable().optional(),
  last_opt_out_source: z.string().nullable().optional(),
  status: z.string().nullable().optional()
});
export type CheckoutNotificationChannel = z.infer<
  typeof CheckoutNotificationChannel
>;

/** The set of notification channels for a given medium (email or sms). */
export const CheckoutNotificationMedium = z.looseObject({
  promotional: CheckoutNotificationChannel.nullable().optional(),
  replenishment: CheckoutNotificationChannel.nullable().optional(),
  transactional: CheckoutNotificationChannel.nullable().optional()
});
export type CheckoutNotificationMedium = z.infer<
  typeof CheckoutNotificationMedium
>;

/** The notification preferences embedded on a 2021-11 checkout. */
export const CheckoutNotificationPreferences = z.looseObject({
  email: CheckoutNotificationMedium.nullable().optional(),
  sms: CheckoutNotificationMedium.nullable().optional()
});
export type CheckoutNotificationPreferences = z.infer<
  typeof CheckoutNotificationPreferences
>;

/**
 * A Recharge checkout (2021-11).
 *
 * @see https://developer.rechargepayments.com/2021-11/checkouts/checkout_object
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
  discount_code: z.string().nullable().optional(),
  buyer_accepts_marketing: z.boolean().nullable().optional(),
  requires_shipping: z.boolean().nullable().optional(),
  taxable: z.boolean().nullable().optional(),
  taxes_included: z.boolean().nullable().optional(),
  payment_processor: z.string().nullable().optional(),
  payment_processor_customer_id: z.string().nullable().optional(),
  payment_processor_transaction_id: z.string().nullable().optional(),
  charge_processed_at: z.string().nullable().optional(),
  external_checkout_id: z.string().nullable().optional(),
  external_checkout_source: z.string().nullable().optional(),
  external_customer_id: z
    .looseObject({
      ecommerce: z.string().nullable().optional(),
      payment_processor: z.string().nullable().optional()
    })
    .nullable()
    .optional(),
  external_transaction_id: z
    .looseObject({ payment_processor: z.string().nullable().optional() })
    .nullable()
    .optional(),
  subtotal_price: Money.nullable().optional(),
  total_line_items_price: Money.nullable().optional(),
  total_discounts: Money.nullable().optional(),
  total_price: Money.nullable().optional(),
  total_tax: Money.nullable().optional(),
  total_weight_grams: z.number().nullable().optional(),
  applied_discount: CheckoutDiscount.nullable().optional(),
  applied_discounts: z.array(CheckoutAppliedDiscount).nullable().optional(),
  applied_shipping_rate: CheckoutShippingRate.nullable().optional(),
  available_shipping_rates: z.array(CheckoutShippingRate).nullable().optional(),
  billing_address: AddressSummary.nullable().optional(),
  shipping_address: AddressSummary.nullable().optional(),
  shipping_address_validations: z
    .looseObject({
      country_is_supported: z.boolean().nullable().optional(),
      ups: z.boolean().nullable().optional()
    })
    .nullable()
    .optional(),
  shipping_line: ShippingLine.nullable().optional(),
  shipping_rate: CheckoutShippingRate.nullable().optional(),
  order_attributes: z.looseObject({}).nullable().optional(),
  notification_preferences:
    CheckoutNotificationPreferences.nullable().optional(),
  analytics_data: AnalyticsData.nullable().optional(),
  line_items: z.array(CheckoutLineItem).nullable().optional(),
  shipping_lines: z.array(CheckoutShippingLine).nullable().optional(),
  tax_lines: z.array(TaxLine).nullable().optional(),
  discounts: z.array(CheckoutDiscount).nullable().optional()
});
export type Checkout = z.infer<typeof Checkout>;

/**
 * A Recharge checkout charge (2021-11), returned by
 * `POST /checkouts/{token}/charge`.
 *
 * @see https://developer.rechargepayments.com/2021-11/checkouts/checkout_charge
 */
export const CheckoutCharge = z.looseObject({
  authorization_token: z.string().nullable().optional(),
  charge_id: z.number().nullable().optional(),
  free: z.boolean().nullable().optional(),
  payment_processor: z.string().nullable().optional(),
  payment_processor_transaction_id: z.string().nullable().optional(),
  payment_token: z.string().nullable().optional(),
  payment_type: z.string().nullable().optional(),
  processor_customer_token: z.string().nullable().optional(),
  processor_payment_method_token: z.string().nullable().optional(),
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

/** Best-effort envelope returned by `POST /checkouts/{token}/process`. */
export const CheckoutProcessResponse = z.looseObject({
  checkout_charge: z.looseObject({}).nullable().optional(),
  checkout: Checkout.nullable().optional()
});
export type CheckoutProcessResponse = z.infer<typeof CheckoutProcessResponse>;

/** Body for `POST /checkouts`. */
export const CheckoutCreateBody = z.looseObject({
  line_items: z.array(z.looseObject({})).optional(),
  email: z.string().optional(),
  shipping_address: z.looseObject({}).optional(),
  billing_address: z.looseObject({}).optional(),
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
  shipping_address: z.looseObject({}).optional(),
  billing_address: z.looseObject({}).optional(),
  shipping_line: z.looseObject({}).optional(),
  note: z.string().optional(),
  buyer_accepts_marketing: z.boolean().optional(),
  discount_code: z.string().optional()
});
export type CheckoutUpdateBody = z.infer<typeof CheckoutUpdateBody>;

/** Body for `POST /checkouts/{token}/process`. */
export const CheckoutProcessBody = z.looseObject({
  payment_processor: z.string().optional(),
  payment_token: z.string().optional(),
  payment_type: z.string().optional(),
  free: z.boolean().optional()
});
export type CheckoutProcessBody = z.infer<typeof CheckoutProcessBody>;
