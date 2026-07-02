import { z } from "zod";
import {
  Money,
  TaxLine,
  AnalyticsData,
  ClientDetails,
  Property,
  Image,
  OrderAttribute
} from "~/models/api/common";

/**
 * Billing/shipping address as embedded on a 2021-01 charge. The 2021-01 surface
 * uses `country` (not `country_code`), so this differs from the shared
 * {@link AddressSummary} fragment used by 2021-11.
 */
export const ChargeAddress = z.looseObject({
  address1: z.string().nullable().optional(),
  address2: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  province: z.string().nullable().optional(),
  zip: z.string().nullable().optional()
});
export type ChargeAddress = z.infer<typeof ChargeAddress>;

/**
 * A line item as embedded on a 2021-01 charge. Uses `shopify_*` identifiers
 * rather than the 2021-11 `external_*` objects.
 */
export const ChargeLineItem = z.looseObject({
  subscription_id: z.number().nullable().optional(),
  title: z.string().nullable().optional(),
  variant_title: z.string().nullable().optional(),
  sku: z.string().nullable().optional(),
  quantity: z.number().nullable().optional(),
  grams: z.number().nullable().optional(),
  price: Money.nullable().optional(),
  original_price: Money.nullable().optional(),
  shopify_product_id: z.union([z.number(), z.string()]).nullable().optional(),
  shopify_variant_id: z.union([z.number(), z.string()]).nullable().optional(),
  properties: z.array(Property).nullable().optional(),
  images: Image.nullable().optional(),
  tax_lines: z.array(TaxLine).nullable().optional()
});
export type ChargeLineItem = z.infer<typeof ChargeLineItem>;

/** A shipping line as embedded on a 2021-01 charge. */
export const ChargeShippingLine = z.looseObject({
  code: z.string().nullable().optional(),
  price: Money.nullable().optional(),
  title: z.string().nullable().optional()
});
export type ChargeShippingLine = z.infer<typeof ChargeShippingLine>;

/** A discount code as embedded on a 2021-01 charge. */
export const ChargeDiscountCode = z.looseObject({
  amount: Money.nullable().optional(),
  code: z.string().nullable().optional(),
  type: z.string().nullable().optional()
});
export type ChargeDiscountCode = z.infer<typeof ChargeDiscountCode>;

/**
 * A Recharge charge (2021-01).
 *
 * @see https://developer.rechargepayments.com/2021-01/charges/charge_object
 */
export const Charge = z.looseObject({
  id: z.number().optional(),
  address_id: z.number().nullable().optional(),
  customer_id: z.union([z.number(), z.string()]).nullable().optional(),
  customer_hash: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  scheduled_at: z.string().nullable().optional(),
  processed_at: z.string().nullable().optional(),
  status: z
    .enum([
      "SUCCESS",
      "ERROR",
      "QUEUED",
      "SKIPPED",
      "REFUNDED",
      "PARTIALLY_REFUNDED",
      "PENDING"
    ])
    .or(z.string())
    .nullable()
    .optional(),
  type: z.enum(["CHECKOUT", "RECURRING"]).or(z.string()).nullable().optional(),
  email: z.string().nullable().optional(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
  note_attributes: z.array(OrderAttribute).nullable().optional(),
  tags: z.string().nullable().optional(),
  processor_name: z.string().nullable().optional(),
  transaction_id: z.string().nullable().optional(),
  shopify_order_id: z.union([z.number(), z.string()]).nullable().optional(),
  shipments_count: z.number().nullable().optional(),
  subtotal_price: Money.nullable().optional(),
  sub_total: z.number().nullable().optional(),
  total_discounts: Money.nullable().optional(),
  total_line_items_price: Money.nullable().optional(),
  total_price: Money.nullable().optional(),
  total_refunds: Money.nullable().optional(),
  total_tax: Money.nullable().optional(),
  total_weight: z.union([z.number(), z.string()]).nullable().optional(),
  tax_lines: z
    .union([z.array(TaxLine), z.number()])
    .nullable()
    .optional(),
  taxes_included: z.boolean().nullable().optional(),
  has_uncommitted_changes: z.boolean().nullable().optional(),
  has_uncommited_changes: z.boolean().nullable().optional(),
  error: z.string().nullable().optional(),
  error_type: z.string().nullable().optional(),
  last_charge_attempt_date: z.string().nullable().optional(),
  number_times_tried: z.number().nullable().optional(),
  retry_date: z.string().nullable().optional(),
  shopify_variant_id_not_found: z
    .union([z.number(), z.string(), z.boolean()])
    .nullable()
    .optional(),
  billing_address: ChargeAddress.nullable().optional(),
  shipping_address: ChargeAddress.nullable().optional(),
  client_details: ClientDetails.nullable().optional(),
  analytics_data: AnalyticsData.nullable().optional(),
  line_items: z.array(ChargeLineItem).nullable().optional(),
  shipping_lines: z.array(ChargeShippingLine).nullable().optional(),
  discount_codes: z.array(ChargeDiscountCode).nullable().optional()
});
export type Charge = z.infer<typeof Charge>;

/** Envelope returned by single-charge endpoints. */
export const ChargeResponse = z.object({ charge: Charge });
export type ChargeResponse = z.infer<typeof ChargeResponse>;

/** Response returned by `GET /charges/count`. */
export const ChargeCountResponse = z.object({ count: z.number() });
export type ChargeCountResponse = z.infer<typeof ChargeCountResponse>;

/** Query parameters accepted by `GET /charges`. */
export const ChargeListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  address_id: z.string().optional(),
  customer_id: z.string().optional(),
  subscription_id: z.string().optional(),
  status: z.string().optional(),
  shopify_order_id: z.string().optional(),
  date: z.string().optional(),
  date_min: z.string().optional(),
  date_max: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional(),
  scheduled_at_min: z.string().optional(),
  scheduled_at_max: z.string().optional()
});
export type ChargeListParams = z.infer<typeof ChargeListParams>;

/** Body for `POST /charges/{id}/change_next_charge_date`. */
export const ChargeChangeNextChargeDate = z.looseObject({
  next_charge_date: z.string().optional(),
  date: z.string().optional()
});
export type ChargeChangeNextChargeDate = z.infer<
  typeof ChargeChangeNextChargeDate
>;

/** Body for `POST /charges/{id}/skip` and `/unskip`. */
export const ChargeSkipBody = z.looseObject({
  subscription_id: z.union([z.number(), z.array(z.number())]).optional(),
  subscription_ids: z.array(z.number()).optional()
});
export type ChargeSkipBody = z.infer<typeof ChargeSkipBody>;

/** Body for `POST /charges/{id}/refund`. */
export const ChargeRefundBody = z.looseObject({
  amount: z.union([z.number(), z.string()]).optional(),
  full_refund: z.boolean().optional()
});
export type ChargeRefundBody = z.infer<typeof ChargeRefundBody>;

/** Body for `POST /charges/{id}/apply_discount`. */
export const ChargeApplyDiscountBody = z.looseObject({
  discount_code: z.string().optional(),
  discount_id: z.number().optional()
});
export type ChargeApplyDiscountBody = z.infer<typeof ChargeApplyDiscountBody>;
