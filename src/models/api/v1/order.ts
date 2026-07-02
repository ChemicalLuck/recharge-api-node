import { z } from "zod";
import { Money, OrderAttribute } from "~/models/api/common";

/**
 * A discount code applied to a 2021-01 order.
 */
export const OrderDiscountCode = z.looseObject({
  code: z.string().nullable().optional(),
  amount: Money.nullable().optional(),
  type: z.string().nullable().optional()
});
export type OrderDiscountCode = z.infer<typeof OrderDiscountCode>;

/**
 * The customer summary embedded on a 2021-01 order.
 */
export const OrderCustomer = z.looseObject({
  accepts_marketing: z.boolean().nullable().optional(),
  email: z.string().nullable().optional(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  send_email_welcome: z.boolean().nullable().optional(),
  verified_email: z.boolean().nullable().optional()
});
export type OrderCustomer = z.infer<typeof OrderCustomer>;

/**
 * Billing/shipping address as embedded on a 2021-01 order.
 */
export const OrderAddress = z.looseObject({
  address1: z.string().nullable().optional(),
  address2: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  country_code: z.string().nullable().optional(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  province: z.string().nullable().optional(),
  zip: z.string().nullable().optional()
});
export type OrderAddress = z.infer<typeof OrderAddress>;

/**
 * Product image URLs as embedded on a 2021-01 order line item.
 */
export const OrderLineItemImages = z.looseObject({
  small: z.string().nullable().optional(),
  medium: z.string().nullable().optional(),
  large: z.string().nullable().optional(),
  original: z.string().nullable().optional()
});
export type OrderLineItemImages = z.infer<typeof OrderLineItemImages>;

/**
 * A line-item property (name/value pair) on a 2021-01 order.
 */
export const OrderLineItemProperty = z.looseObject({
  name: z.string().nullable().optional(),
  value: z.string().nullable().optional()
});
export type OrderLineItemProperty = z.infer<typeof OrderLineItemProperty>;

/**
 * A tax line as embedded on a 2021-01 order.
 */
export const OrderTaxLine = z.looseObject({
  price: Money.nullable().optional(),
  rate: z.number().nullable().optional(),
  title: z.string().nullable().optional()
});
export type OrderTaxLine = z.infer<typeof OrderTaxLine>;

/**
 * A line item as embedded on a 2021-01 order.
 */
export const OrderLineItem = z.looseObject({
  subscription_id: z.number().nullable().optional(),
  external_inventory_policy: z.string().nullable().optional(),
  original_price: Money.nullable().optional(),
  price: Money.nullable().optional(),
  quantity: z.number().nullable().optional(),
  grams: z.number().nullable().optional(),
  shopify_product_id: z.union([z.number(), z.string()]).nullable().optional(),
  shopify_variant_id: z.union([z.number(), z.string()]).nullable().optional(),
  sku: z.string().nullable().optional(),
  product_title: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  variant_title: z.string().nullable().optional(),
  handle: z.string().nullable().optional(),
  tax_lines: z.array(OrderTaxLine).nullable().optional(),
  properties: z.array(OrderLineItemProperty).nullable().optional(),
  images: OrderLineItemImages.nullable().optional()
});
export type OrderLineItem = z.infer<typeof OrderLineItem>;

/**
 * A shipping line as embedded on a 2021-01 order.
 */
export const OrderShippingLine = z.looseObject({
  code: z.string().nullable().optional(),
  price: Money.nullable().optional(),
  title: z.string().nullable().optional(),
  carrier_identifier: z.string().nullable().optional(),
  phone: z.string().nullable().optional()
});
export type OrderShippingLine = z.infer<typeof OrderShippingLine>;

/**
 * A Recharge order (2021-01).
 *
 * @see https://developer.rechargepayments.com/2021-01/orders/order_object
 */
export const Order = z.looseObject({
  id: z.number().nullable().optional(),
  hash: z.string().nullable().optional(),
  address_id: z.number().nullable().optional(),
  address_is_active: z.number().nullable().optional(),
  customer_id: z.number().nullable().optional(),
  charge_id: z.number().nullable().optional(),
  subscription_id: z.number().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  processed_at: z.string().nullable().optional(),
  scheduled_at: z.string().nullable().optional(),
  shipped_date: z.string().nullable().optional(),
  shipping_date: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  is_prepaid: z.number().nullable().optional(),
  email: z.string().nullable().optional(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  error: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
  note_attributes: z.array(OrderAttribute).nullable().optional(),
  tags: z.string().nullable().optional(),
  payment_processor: z.string().nullable().optional(),
  transaction_id: z.string().nullable().optional(),
  charge_status: z.string().nullable().optional(),
  currency: z.string().nullable().optional(),
  shopify_id: z.union([z.number(), z.string()]).nullable().optional(),
  shopify_cart_token: z.string().nullable().optional(),
  shopify_customer_id: z.union([z.number(), z.string()]).nullable().optional(),
  shopify_order_id: z.union([z.number(), z.string()]).nullable().optional(),
  shopify_order_number: z.union([z.number(), z.string()]).nullable().optional(),
  external_order_id: z.string().nullable().optional(),
  external_order_number: z.string().nullable().optional(),
  total_weight: z.number().nullable().optional(),
  subtotal_price: Money.nullable().optional(),
  total_discounts: Money.nullable().optional(),
  total_duties: Money.nullable().optional(),
  total_line_items_price: Money.nullable().optional(),
  total_price: Money.nullable().optional(),
  total_refunds: Money.nullable().optional(),
  total_tax: Money.nullable().optional(),
  taxable: z.boolean().nullable().optional(),
  taxes_included: z.boolean().nullable().optional(),
  address: OrderAddress.nullable().optional(),
  billing_address: OrderAddress.nullable().optional(),
  shipping_address: OrderAddress.nullable().optional(),
  customer: OrderCustomer.nullable().optional(),
  discount_codes: z.array(OrderDiscountCode).nullable().optional(),
  line_items: z.array(OrderLineItem).nullable().optional(),
  shipping_lines: z.array(OrderShippingLine).nullable().optional(),
  tax_lines: z.array(OrderTaxLine).nullable().optional()
});
export type Order = z.infer<typeof Order>;

/** Envelope returned by single-order endpoints. */
export const OrderResponse = z.object({ order: Order });
export type OrderResponse = z.infer<typeof OrderResponse>;

/** Envelope returned by the count endpoint. */
export const OrderCountResponse = z.object({ count: z.number() });
export type OrderCountResponse = z.infer<typeof OrderCountResponse>;

/** Query parameters accepted by `GET /orders` and `GET /orders/count`. */
export const OrderListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  address_id: z.string().optional(),
  charge_id: z.string().optional(),
  customer_id: z.string().optional(),
  subscription_id: z.string().optional(),
  shopify_customer_id: z.string().optional(),
  shopify_order_id: z.string().optional(),
  status: z.string().optional(),
  sort_by: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  scheduled_at_min: z.string().optional(),
  scheduled_at_max: z.string().optional(),
  processed_at_min: z.string().optional(),
  processed_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional()
});
export type OrderListParams = z.infer<typeof OrderListParams>;

/** Body for `PUT /orders/{id}`. */
export const OrderUpdateBody = z.looseObject({
  billing_address: OrderAddress.optional(),
  shipping_address: OrderAddress.optional(),
  line_items: z.array(z.looseObject({})).optional(),
  note: z.string().optional(),
  tags: z.string().optional(),
  scheduled_at: z.string().optional(),
  status: z.string().optional()
});
export type OrderUpdateBody = z.infer<typeof OrderUpdateBody>;

/** Body for `POST /orders/{id}/change_date`. */
export const OrderChangeDateBody = z.looseObject({
  scheduled_at: z.string().optional()
});
export type OrderChangeDateBody = z.infer<typeof OrderChangeDateBody>;

/** Body for `PUT /orders/{id}/change_variant`. */
export const OrderChangeVariantBody = z.looseObject({
  new_shopify_variant_id: z.number().optional()
});
export type OrderChangeVariantBody = z.infer<typeof OrderChangeVariantBody>;

/** Body for `POST /orders/{id}/clone`. */
export const OrderCloneBody = z.looseObject({
  scheduled_at: z.string().optional()
});
export type OrderCloneBody = z.infer<typeof OrderCloneBody>;
