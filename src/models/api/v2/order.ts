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
 * The customer summary embedded on an order.
 */
export const OrderCustomer = z.looseObject({
  id: z.number().nullable().optional(),
  email: z.string().nullable().optional(),
  hash: z.string().nullable().optional(),
  external_customer_id: ExternalId.nullable().optional()
});
export type OrderCustomer = z.infer<typeof OrderCustomer>;

/**
 * A Recharge order (2021-11).
 *
 * @see https://developer.rechargepayments.com/2021-11/orders/order_object
 */
export const Order = z.looseObject({
  id: z.number().nullable().optional(),
  hash: z.string().nullable().optional(),
  address_id: z.number().nullable().optional(),
  charge: z
    .looseObject({
      id: z.number().nullable().optional(),
      external_transaction_id: z
        .looseObject({ payment_processor: z.string().nullable().optional() })
        .nullable()
        .optional()
    })
    .nullable()
    .optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  status: z
    .enum(["success", "error", "queued", "cancelled", "pending"])
    .nullable()
    .optional(),
  type: z.enum(["checkout", "recurring"]).nullable().optional(),
  is_prepaid: z.boolean().nullable().optional(),
  processed_at: z.string().nullable().optional(),
  scheduled_at: z.string().nullable().optional(),
  shipped_date: z.string().nullable().optional(),
  cancelled_at: z.string().nullable().optional(),
  cancel_reason: z.string().nullable().optional(),
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
  retry_date: z.string().nullable().optional(),
  subtotal_price: Money.nullable().optional(),
  total_line_items_price: Money.nullable().optional(),
  total_discounts: Money.nullable().optional(),
  total_price: Money.nullable().optional(),
  total_tax: Money.nullable().optional(),
  total_refunds: Money.nullable().optional(),
  billing_address: AddressSummary.nullable().optional(),
  shipping_address: AddressSummary.nullable().optional(),
  customer: OrderCustomer.nullable().optional(),
  client_details: ClientDetails.nullable().optional(),
  external_order_id: ExternalId.nullable().optional(),
  external_order_number: ExternalId.nullable().optional(),
  external_transaction_id: z
    .looseObject({ payment_processor: z.string().nullable().optional() })
    .nullable()
    .optional(),
  external_cart_token: z.string().nullable().optional(),
  total_duties: Money.nullable().optional(),
  analytics_data: AnalyticsData.nullable().optional(),
  line_items: z.array(LineItem).nullable().optional(),
  discounts: z.array(DiscountSummary).nullable().optional(),
  shipping_lines: z.array(ShippingLine).nullable().optional(),
  tax_lines: z.array(TaxLine).nullable().optional(),
  order_attributes: z.array(OrderAttribute).nullable().optional()
});
export type Order = z.infer<typeof Order>;

/** Envelope returned by single-order endpoints. */
export const OrderResponse = z.object({ order: Order });
export type OrderResponse = z.infer<typeof OrderResponse>;

/** Query parameters accepted by `GET /orders`. */
export const OrderListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  address_id: z.string().optional(),
  charge_id: z.string().optional(),
  customer_id: z.string().optional(),
  subscription_id: z.string().optional(),
  status: z.string().optional(),
  sort_by: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  scheduled_at_min: z.string().optional(),
  scheduled_at_max: z.string().optional(),
  processed_at_min: z.string().optional(),
  processed_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional(),
  external_order_id: z.string().optional()
});
export type OrderListParams = z.infer<typeof OrderListParams>;

/** Body for `PUT /orders/{id}`. */
export const OrderUpdateBody = z.looseObject({
  billing_address: z.looseObject({}).optional(),
  shipping_address: z.looseObject({}).optional(),
  line_items: z.array(z.looseObject({})).optional(),
  note: z.string().optional(),
  tags: z.string().optional(),
  scheduled_at: z.string().optional(),
  status: z.string().optional()
});
export type OrderUpdateBody = z.infer<typeof OrderUpdateBody>;

/** Body for `POST /orders/{id}/clone`. */
export const OrderCloneBody = z.looseObject({
  scheduled_at: z.string().optional()
});
export type OrderCloneBody = z.infer<typeof OrderCloneBody>;

/** Body for `POST /orders/{id}/delay`. */
export const OrderDelayBody = z.looseObject({
  scheduled_at: z.string().optional(),
  purchase_item_ids: z.array(z.number()).optional()
});
export type OrderDelayBody = z.infer<typeof OrderDelayBody>;
