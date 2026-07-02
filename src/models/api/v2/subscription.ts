import { z } from "zod";
import {
  Money,
  Property,
  AnalyticsData,
  ExternalId
} from "~/models/api/common";

/**
 * A Recharge subscription (2021-11).
 *
 * @see https://developer.rechargepayments.com/2021-11/subscriptions/subscriptions_object
 */
export const Subscription = z.looseObject({
  id: z.number().optional(),
  address_id: z.number().nullable().optional(),
  customer_id: z.number().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  cancelled_at: z.string().nullable().optional(),
  next_charge_scheduled_at: z.string().nullable().optional(),
  status: z
    .enum(["active", "cancelled", "expired"])
    .or(z.string())
    .nullable()
    .optional(),
  email: z.string().nullable().optional(),
  price: Money.nullable().optional(),
  quantity: z.number().nullable().optional(),
  product_title: z.string().nullable().optional(),
  variant_title: z.string().nullable().optional(),
  sku: z.string().nullable().optional(),
  sku_override: z.boolean().nullable().optional(),
  external_product_id: ExternalId.nullable().optional(),
  external_variant_id: ExternalId.nullable().optional(),
  presentment_currency: z.string().nullable().optional(),
  charge_interval_frequency: Money.nullable().optional(),
  order_interval_frequency: z.number().nullable().optional(),
  order_interval_unit: z
    .enum(["day", "week", "month"])
    .or(z.string())
    .nullable()
    .optional(),
  order_day_of_week: z.number().nullable().optional(),
  order_day_of_month: z.number().nullable().optional(),
  expire_after_specific_number_of_charges: z.number().nullable().optional(),
  cancellation_reason: z.string().nullable().optional(),
  cancellation_reason_comments: z.string().nullable().optional(),
  has_queued_charges: z.union([z.boolean(), z.number()]).nullable().optional(),
  is_prepaid: z.boolean().nullable().optional(),
  is_skippable: z.boolean().nullable().optional(),
  is_swappable: z.boolean().nullable().optional(),
  max_retries_reached: z.union([z.boolean(), z.number()]).nullable().optional(),
  properties: z.array(Property).nullable().optional(),
  analytics_data: AnalyticsData.nullable().optional()
});
export type Subscription = z.infer<typeof Subscription>;

/** Envelope returned by single-subscription endpoints. */
export const SubscriptionResponse = z.object({ subscription: Subscription });
export type SubscriptionResponse = z.infer<typeof SubscriptionResponse>;

/** Query parameters accepted by `GET /subscriptions`. */
export const SubscriptionListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  address_id: z.string().optional(),
  address_ids: z.string().optional(),
  customer_id: z.string().optional(),
  status: z.string().optional(),
  external_product_id: z.string().optional(),
  external_variant_id: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional(),
  sort_by: z.string().optional()
});
export type SubscriptionListParams = z.infer<typeof SubscriptionListParams>;

/** Body for `POST /subscriptions`. */
export const SubscriptionCreate = z.looseObject({
  address_id: z.number().optional(),
  next_charge_scheduled_at: z.string().optional(),
  order_interval_frequency: z.union([z.number(), z.string()]).optional(),
  order_interval_unit: z.string().optional(),
  charge_interval_frequency: z.union([z.number(), z.string()]).optional(),
  order_day_of_week: z.number().optional(),
  order_day_of_month: z.number().optional(),
  quantity: z.number().optional(),
  external_variant_id: ExternalId.optional(),
  external_product_id: ExternalId.optional(),
  price: z.union([z.number(), z.string()]).optional(),
  product_title: z.string().optional(),
  properties: z.array(Property).optional(),
  status: z.string().optional(),
  sku: z.string().optional(),
  sku_override: z.boolean().optional(),
  expire_after_specific_number_of_charges: z.number().optional(),
  analytics_data: AnalyticsData.optional()
});
export type SubscriptionCreate = z.infer<typeof SubscriptionCreate>;

/** Body for `PUT /subscriptions/{id}`. */
export const SubscriptionUpdate = z.looseObject({
  address_id: z.number().optional(),
  order_interval_frequency: z.union([z.number(), z.string()]).optional(),
  order_interval_unit: z.string().optional(),
  charge_interval_frequency: z.union([z.number(), z.string()]).optional(),
  order_day_of_week: z.number().optional(),
  order_day_of_month: z.number().optional(),
  quantity: z.number().optional(),
  external_variant_id: ExternalId.optional(),
  price: z.union([z.number(), z.string()]).optional(),
  product_title: z.string().optional(),
  variant_title: z.string().optional(),
  properties: z.array(Property).optional(),
  sku: z.string().optional(),
  sku_override: z.boolean().optional(),
  use_external_variant_defaults: z.boolean().optional(),
  commit_update: z.boolean().optional(),
  expire_after_specific_number_of_charges: z.number().optional()
});
export type SubscriptionUpdate = z.infer<typeof SubscriptionUpdate>;

/** Body for `POST /subscriptions/{id}/set_next_charge_date`. */
export const SubscriptionSetNextChargeDate = z.looseObject({
  date: z.string().optional()
});
export type SubscriptionSetNextChargeDate = z.infer<
  typeof SubscriptionSetNextChargeDate
>;

/** Body for `POST /subscriptions/{id}/change_address`. */
export const SubscriptionChangeAddress = z.looseObject({
  address_id: z.number().optional()
});
export type SubscriptionChangeAddress = z.infer<
  typeof SubscriptionChangeAddress
>;

/** Body for `POST /subscriptions/{id}/cancel`. */
export const SubscriptionCancel = z.looseObject({
  cancellation_reason: z.string().optional(),
  cancellation_reason_comments: z.string().optional(),
  send_email: z.boolean().optional()
});
export type SubscriptionCancel = z.infer<typeof SubscriptionCancel>;

/** Body for `POST /subscriptions/{id}/gift`. */
export const SubscriptionGift = z.looseObject({
  recipient_email: z.string().optional(),
  message: z.string().optional(),
  send_email: z.boolean().optional()
});
export type SubscriptionGift = z.infer<typeof SubscriptionGift>;
