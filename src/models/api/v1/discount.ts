import { z } from "zod";

/**
 * Per-channel visibility/applicability settings for a discount.
 *
 * Each channel carries a `can_apply` flag indicating whether the discount may
 * be applied through that channel.
 */
export const DiscountChannelSetting = z.looseObject({
  can_apply: z.boolean().nullable().optional()
});
export type DiscountChannelSetting = z.infer<typeof DiscountChannelSetting>;

/** The `channel_settings` object on a discount. */
export const DiscountChannelSettings = z.looseObject({
  api: DiscountChannelSetting.nullable().optional(),
  checkout_page: DiscountChannelSetting.nullable().optional(),
  customer_portal: DiscountChannelSetting.nullable().optional(),
  merchant_portal: DiscountChannelSetting.nullable().optional()
});
export type DiscountChannelSettings = z.infer<typeof DiscountChannelSettings>;

/**
 * A Recharge discount (2021-01).
 *
 * @see https://developer.rechargepayments.com/2021-01/discounts/discount_object
 */
export const Discount = z.looseObject({
  id: z.number().nullable().optional(),
  code: z.string().nullable().optional(),
  value: z.number().nullable().optional(),
  status: z.string().nullable().optional(),
  applies_to: z.unknown().nullable().optional(),
  applies_to_id: z.unknown().nullable().optional(),
  applies_to_product_type: z.string().nullable().optional(),
  applies_to_resource: z.unknown().nullable().optional(),
  channel_settings: DiscountChannelSettings.nullable().optional(),
  discount_type: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),
  duration_usage_limit: z.number().nullable().optional(),
  once_per_customer: z.boolean().nullable().optional(),
  prerequisite_subtotal_min: z.unknown().nullable().optional(),
  starts_at: z.string().nullable().optional(),
  ends_at: z.string().nullable().optional(),
  usage_limit: z.number().nullable().optional(),
  times_used: z.number().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional()
});
export type Discount = z.infer<typeof Discount>;

/** Envelope returned by single-discount endpoints. */
export const DiscountResponse = z.object({ discount: Discount });
export type DiscountResponse = z.infer<typeof DiscountResponse>;

/** Query parameters accepted by `GET /discounts`. */
export const DiscountListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  discount_code: z.string().optional(),
  discount_type: z.string().optional(),
  status: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional()
});
export type DiscountListParams = z.infer<typeof DiscountListParams>;

/** Body for `POST /discounts`. */
export const DiscountCreateBody = z.looseObject({
  code: z.string().optional(),
  value: z.number().optional(),
  value_type: z.string().optional(),
  status: z.string().optional(),
  applies_to: z.string().optional(),
  applies_to_id: z.number().optional(),
  applies_to_product_type: z.string().optional(),
  applies_to_resource: z.string().optional(),
  channel_settings: z.looseObject({}).optional(),
  discount_type: z.string().optional(),
  duration: z.string().optional(),
  duration_usage_limit: z.number().optional(),
  first_time_customer_restriction: z.string().optional(),
  once_per_customer: z.boolean().optional(),
  prerequisite_subtotal_min: z.string().optional(),
  starts_at: z.string().optional(),
  ends_at: z.string().optional(),
  usage_limit: z.number().optional()
});
export type DiscountCreateBody = z.infer<typeof DiscountCreateBody>;

/** Body for `PUT /discounts/{id}`. */
export const DiscountUpdateBody = z.looseObject({
  code: z.string().optional(),
  value: z.number().optional(),
  value_type: z.string().optional(),
  status: z.string().optional(),
  applies_to: z.string().optional(),
  applies_to_id: z.number().optional(),
  applies_to_product_type: z.string().optional(),
  applies_to_resource: z.string().optional(),
  channel_settings: z.looseObject({}).optional(),
  discount_type: z.string().optional(),
  duration: z.string().optional(),
  duration_usage_limit: z.number().optional(),
  once_per_customer: z.boolean().optional(),
  prerequisite_subtotal_min: z.string().optional(),
  starts_at: z.string().optional(),
  ends_at: z.string().optional(),
  usage_limit: z.number().optional()
});
export type DiscountUpdateBody = z.infer<typeof DiscountUpdateBody>;

/** Body for `POST /addresses/{addressId}/discounts` and `POST /charges/{chargeId}/discounts`. */
export const DiscountApplyBody = z.looseObject({
  discount_code: z.string().optional(),
  discount_id: z.number().optional()
});
export type DiscountApplyBody = z.infer<typeof DiscountApplyBody>;
