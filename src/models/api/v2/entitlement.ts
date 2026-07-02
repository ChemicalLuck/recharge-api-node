import { z } from "zod";

/**
 * A Recharge customer entitlement (2021-11).
 *
 * Entitlements describe delivery/benefit grants tied to a subscription or
 * customer (e.g. free shipping, priority delivery).
 *
 * @see https://developer.rechargepayments.com/2021-11/entitlements
 */
export const Entitlement = z.looseObject({
  id: z.number().nullable().optional(),
  customer_id: z.number().nullable().optional(),
  entitlement_feature_id: z.number().nullable().optional(),
  granted_by_id: z.string().nullable().optional(),
  granted_by_type: z.string().nullable().optional(),
  expires_at: z.string().nullable().optional(),
  deleted_at: z.unknown().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional()
});
export type Entitlement = z.infer<typeof Entitlement>;

/** Envelope returned by single-entitlement endpoints. */
export const EntitlementResponse = z.object({ entitlement: Entitlement });
export type EntitlementResponse = z.infer<typeof EntitlementResponse>;

/** Query parameters accepted by `GET /entitlements`. */
export const EntitlementListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  customer_id: z.string().optional(),
  subscription_id: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional()
});
export type EntitlementListParams = z.infer<typeof EntitlementListParams>;

/** Body for `POST /entitlements`. */
export const EntitlementCreateBody = z.looseObject({
  subscription_id: z.number().optional(),
  customer_id: z.number().optional(),
  type: z.string().optional(),
  benefit_type: z.string().optional(),
  benefit_value: z.string().optional(),
  status: z.string().optional(),
  starts_at: z.string().optional(),
  ends_at: z.string().optional()
});
export type EntitlementCreateBody = z.infer<typeof EntitlementCreateBody>;

/** Body for `PUT /entitlements/{id}`. */
export const EntitlementUpdateBody = z.looseObject({
  type: z.string().optional(),
  benefit_type: z.string().optional(),
  benefit_value: z.string().optional(),
  status: z.string().optional(),
  starts_at: z.string().optional(),
  ends_at: z.string().optional()
});
export type EntitlementUpdateBody = z.infer<typeof EntitlementUpdateBody>;
