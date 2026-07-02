import { z } from "zod";
import { ExternalId } from "~/models/api/common";

/**
 * Per-channel visibility settings for a plan.
 */
export const PlanChannelSetting = z.looseObject({
  display: z.boolean().nullable().optional()
});
export type PlanChannelSetting = z.infer<typeof PlanChannelSetting>;

/** The `channel_settings` object on a plan. */
export const PlanChannelSettings = z.looseObject({
  api: PlanChannelSetting.nullable().optional(),
  checkout_page: PlanChannelSetting.nullable().optional(),
  customer_portal: PlanChannelSetting.nullable().optional(),
  merchant_portal: PlanChannelSetting.nullable().optional()
});
export type PlanChannelSettings = z.infer<typeof PlanChannelSettings>;

/** The subscription cadence/preferences described by a plan. */
export const PlanSubscriptionPreferences = z.looseObject({
  apply_cutoff_date_to_checkout: z.boolean().nullable().optional(),
  charge_interval_frequency: z.number().nullable().optional(),
  cutoff_day_of_month: z.number().nullable().optional(),
  cutoff_day_of_week: z.number().nullable().optional(),
  expire_after_specific_number_of_charges: z.number().nullable().optional(),
  interval_unit: z.string().nullable().optional(),
  order_day_of_month: z.number().nullable().optional(),
  order_day_of_week: z.number().nullable().optional(),
  order_interval_frequency: z.number().nullable().optional()
});
export type PlanSubscriptionPreferences = z.infer<
  typeof PlanSubscriptionPreferences
>;

/**
 * A Recharge subscription plan (2021-11).
 *
 * @see https://developer.rechargepayments.com/2021-11/plans/plan_object
 */
export const Plan = z.looseObject({
  id: z.number().nullable().optional(),
  channel_settings: PlanChannelSettings.nullable().optional(),
  discount_amount: z.string().nullable().optional(),
  discount_type: z.string().nullable().optional(),
  external_plan_group_id: z.string().nullable().optional(),
  external_plan_id: z.string().nullable().optional(),
  external_plan_name: z.string().nullable().optional(),
  external_product_id: ExternalId.nullable().optional(),
  external_variant_ids: z.array(z.string()).nullable().optional(),
  has_variant_restrictions: z.boolean().nullable().optional(),
  sort_order: z.number().nullable().optional(),
  subscription_preferences: PlanSubscriptionPreferences.nullable().optional(),
  title: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  deleted_at: z.unknown().nullable().optional()
});
export type Plan = z.infer<typeof Plan>;

/** Envelope returned by single-plan endpoints. */
export const PlanResponse = z.object({ plan: Plan });
export type PlanResponse = z.infer<typeof PlanResponse>;

/** Envelope returned by the bulk plan endpoints. */
export const PlansResponse = z.looseObject({
  plans: z.array(Plan).nullable().optional()
});
export type PlansResponse = z.infer<typeof PlansResponse>;

/** Query parameters accepted by `GET /plans`. */
export const PlanListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  external_product_id: z.string().optional(),
  type: z.string().optional(),
  sort_by: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional()
});
export type PlanListParams = z.infer<typeof PlanListParams>;

/** Body for `POST /plans`. */
export const PlanCreateBody = z.looseObject({
  external_product_id: ExternalId.optional(),
  title: z.string().optional(),
  type: z.string().optional(),
  channel_settings: PlanChannelSettings.optional(),
  discount_amount: z.string().optional(),
  discount_type: z.string().optional(),
  sort_order: z.number().optional(),
  sku_override: z.string().optional(),
  subscription_preferences: PlanSubscriptionPreferences.optional(),
  has_variant_restrictions: z.boolean().optional()
});
export type PlanCreateBody = z.infer<typeof PlanCreateBody>;

/** Body for `PUT /plans/{id}`. */
export const PlanUpdateBody = z.looseObject({
  title: z.string().optional(),
  type: z.string().optional(),
  channel_settings: PlanChannelSettings.optional(),
  discount_amount: z.string().optional(),
  discount_type: z.string().optional(),
  sort_order: z.number().optional(),
  sku_override: z.string().optional(),
  subscription_preferences: PlanSubscriptionPreferences.optional(),
  has_variant_restrictions: z.boolean().optional()
});
export type PlanUpdateBody = z.infer<typeof PlanUpdateBody>;

/** Body for `POST /plans/bulk`. */
export const PlanBulkCreateBody = z.looseObject({
  plans: z.array(PlanCreateBody).optional()
});
export type PlanBulkCreateBody = z.infer<typeof PlanBulkCreateBody>;

/** Body for `PUT /plans/bulk`. */
export const PlanBulkUpdateBody = z.looseObject({
  plans: z.array(z.looseObject({ id: z.number().optional() })).optional()
});
export type PlanBulkUpdateBody = z.infer<typeof PlanBulkUpdateBody>;

/** Body for `DELETE /plans/bulk`. */
export const PlanBulkDeleteBody = z.looseObject({
  plan_ids: z.array(z.number()).optional()
});
export type PlanBulkDeleteBody = z.infer<typeof PlanBulkDeleteBody>;
