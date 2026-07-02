import { z } from "zod";
import {
  Money,
  AddressSummary,
  LineItem,
  DiscountSummary,
  ShippingLine,
  TaxLine,
  OrderAttribute,
  AnalyticsData,
  ClientDetails,
  ExternalId
} from "~/models/api/common";

/**
 * The customer summary embedded on a charge.
 */
export const ChargeCustomer = z.looseObject({
  id: z.number().nullable().optional(),
  email: z.string().nullable().optional(),
  hash: z.string().nullable().optional(),
  external_customer_id: ExternalId.nullable().optional()
});
export type ChargeCustomer = z.infer<typeof ChargeCustomer>;

/**
 * A Recharge charge (2021-11).
 *
 * @see https://developer.rechargepayments.com/2021-11/charges/charge_object
 */
export const Charge = z.looseObject({
  id: z.number().optional(),
  address_id: z.number().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  status: z
    .enum([
      "success",
      "error",
      "queued",
      "skipped",
      "refunded",
      "partially_refunded",
      "pending_manual_payment",
      "pending"
    ])
    .nullable()
    .optional(),
  type: z.enum(["checkout", "recurring"]).nullable().optional(),
  scheduled_at: z.string().nullable().optional(),
  processed_at: z.string().nullable().optional(),
  payment_processor: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
  tags: z.string().nullable().optional(),
  taxable: z.boolean().nullable().optional(),
  taxes_included: z.boolean().nullable().optional(),
  orders_count: z.number().nullable().optional(),
  total_weight_grams: z.number().nullable().optional(),
  has_uncommitted_changes: z.boolean().nullable().optional(),
  error: z.string().nullable().optional(),
  error_type: z.string().nullable().optional(),
  charge_attempts: z.number().nullable().optional(),
  retry_date: z.string().nullable().optional(),
  external_variant_id_not_found: z.boolean().nullable().optional(),
  subtotal_price: Money.nullable().optional(),
  total_line_items_price: Money.nullable().optional(),
  total_discounts: Money.nullable().optional(),
  total_price: Money.nullable().optional(),
  total_tax: Money.nullable().optional(),
  total_refunds: Money.nullable().optional(),
  billing_address: AddressSummary.nullable().optional(),
  shipping_address: AddressSummary.nullable().optional(),
  customer: ChargeCustomer.nullable().optional(),
  client_details: ClientDetails.nullable().optional(),
  external_order_id: ExternalId.nullable().optional(),
  external_transaction_id: z
    .looseObject({ payment_processor: z.string().nullable().optional() })
    .nullable()
    .optional(),
  analytics_data: AnalyticsData.nullable().optional(),
  line_items: z.array(LineItem).nullable().optional(),
  discounts: z.array(DiscountSummary).nullable().optional(),
  shipping_lines: z.array(ShippingLine).nullable().optional(),
  tax_lines: z.array(TaxLine).nullable().optional(),
  order_attributes: z.array(OrderAttribute).nullable().optional()
});
export type Charge = z.infer<typeof Charge>;

/** Envelope returned by single-charge endpoints. */
export const ChargeResponse = z.object({ charge: Charge });
export type ChargeResponse = z.infer<typeof ChargeResponse>;

/** Query parameters accepted by `GET /charges`. */
export const ChargeListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  address_id: z.string().optional(),
  customer_id: z.string().optional(),
  subscription_id: z.string().optional(),
  purchase_item_id: z.string().optional(),
  status: z.string().optional(),
  sort_by: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  scheduled_at_min: z.string().optional(),
  scheduled_at_max: z.string().optional(),
  processed_at_min: z.string().optional(),
  processed_at_max: z.string().optional(),
  external_order_id: z.string().optional()
});
export type ChargeListParams = z.infer<typeof ChargeListParams>;

/** Body for `POST /charges/{id}/apply_discount`. */
export const ChargeApplyDiscountBody = z.looseObject({
  discount_code: z.string().optional(),
  discount_id: z.number().optional()
});
export type ChargeApplyDiscountBody = z.infer<typeof ChargeApplyDiscountBody>;

/** Body for `POST /charges/{id}/skip` and `/unskip`. */
export const ChargeSkipBody = z.looseObject({
  purchase_item_ids: z.array(z.number()).optional()
});
export type ChargeSkipBody = z.infer<typeof ChargeSkipBody>;

/** Body for `POST /charges/{id}/refund`. */
export const ChargeRefundBody = z.looseObject({
  amount: z.string().optional(),
  full_refund: z.boolean().optional(),
  reason: z.string().optional(),
  retry: z.boolean().optional()
});
export type ChargeRefundBody = z.infer<typeof ChargeRefundBody>;

/** Body for the free-gift endpoints. */
export const ChargeFreeGiftBody = z.looseObject({
  external_product_id: z.string().optional(),
  external_variant_id: z.string().optional(),
  quantity: z.number().optional(),
  price: z.string().optional()
});
export type ChargeFreeGiftBody = z.infer<typeof ChargeFreeGiftBody>;
