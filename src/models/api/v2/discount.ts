import { z } from "zod";
import { ExternalId } from "~/models/api/common";

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

/** The `applies_to` scoping object on a discount. */
export const DiscountAppliesTo = z.looseObject({
  ids: z.array(z.number()).nullable().optional(),
  purchase_item_type: z.string().nullable().optional(),
  resource: z.string().nullable().optional()
});
export type DiscountAppliesTo = z.infer<typeof DiscountAppliesTo>;

/** The `usage_limits` object on a discount. */
export const DiscountUsageLimits = z.looseObject({
  first_time_customer_restriction: z.boolean().nullable().optional(),
  max_subsequent_redemptions: z.number().nullable().optional(),
  one_application_per_customer: z.boolean().nullable().optional()
});
export type DiscountUsageLimits = z.infer<typeof DiscountUsageLimits>;

/**
 * A Recharge discount (2021-11).
 *
 * @see https://developer.rechargepayments.com/2021-11/discounts/discount_object
 */
export const Discount = z.looseObject({
  id: z.number().nullable().optional(),
  code: z.string().nullable().optional(),
  value: z.string().nullable().optional(),
  value_type: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  applies_to: DiscountAppliesTo.nullable().optional(),
  channel_settings: DiscountChannelSettings.nullable().optional(),
  external_discount_id: ExternalId.nullable().optional(),
  external_discount_source: z.unknown().nullable().optional(),
  prerequisite_subtotal_min: z.unknown().nullable().optional(),
  starts_at: z.string().nullable().optional(),
  ends_at: z.string().nullable().optional(),
  usage_limits: DiscountUsageLimits.nullable().optional(),
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
  cursor: z.string().optional(),
  discount_code: z.string().optional(),
  discount_type: z.string().optional(),
  status: z.string().optional(),
  sort_by: z.string().optional(),
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
  applies_to: DiscountAppliesTo.optional(),
  applies_to_id: z.number().optional(),
  applies_to_product_type: z.string().optional(),
  applies_to_resource: z.string().optional(),
  channel_settings: DiscountChannelSettings.optional(),
  discount_type: z.string().optional(),
  duration: z.string().optional(),
  duration_usage_limit: z.number().optional(),
  external_discount_id: ExternalId.optional(),
  external_discount_source: z.string().optional(),
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
  applies_to: DiscountAppliesTo.optional(),
  applies_to_id: z.number().optional(),
  applies_to_product_type: z.string().optional(),
  applies_to_resource: z.string().optional(),
  channel_settings: DiscountChannelSettings.optional(),
  discount_type: z.string().optional(),
  duration: z.string().optional(),
  duration_usage_limit: z.number().optional(),
  starts_at: z.string().optional(),
  ends_at: z.string().optional(),
  once_per_customer: z.boolean().optional(),
  prerequisite_subtotal_min: z.string().optional(),
  usage_limit: z.number().optional()
});
export type DiscountUpdateBody = z.infer<typeof DiscountUpdateBody>;
