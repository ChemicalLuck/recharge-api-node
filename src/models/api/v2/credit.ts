import { z } from "zod";
import { Money, ExternalId } from "~/models/api/common";

/**
 * A Recharge credit account (2021-11).
 *
 * @see https://developer.rechargepayments.com/2021-11/credit_accounts
 */
export const CreditAccount = z.looseObject({
  id: z.number().nullable().optional(),
  name: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  customer_id: z.number().nullable().optional(),
  currency_code: z.string().nullable().optional(),
  available_balance: Money.nullable().optional(),
  initial_value: Money.nullable().optional(),
  expires_at: z.unknown().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional()
});
export type CreditAccount = z.infer<typeof CreditAccount>;

/** Envelope returned by single-credit-account endpoints. */
export const CreditAccountResponse = z.object({
  credit_account: CreditAccount
});
export type CreditAccountResponse = z.infer<typeof CreditAccountResponse>;

/** The `created_by` actor recorded on a credit adjustment. */
export const CreditAdjustmentCreatedBy = z.looseObject({
  identifier: z.string().nullable().optional(),
  resource_id: z.unknown().nullable().optional(),
  type: z.string().nullable().optional()
});
export type CreditAdjustmentCreatedBy = z.infer<
  typeof CreditAdjustmentCreatedBy
>;

/**
 * A Recharge credit adjustment (2021-11).
 *
 * @see https://developer.rechargepayments.com/2021-11/credit_adjustments
 */
export const CreditAdjustment = z.looseObject({
  id: z.number().nullable().optional(),
  credit_account_id: z.number().nullable().optional(),
  type: z.string().nullable().optional(),
  currency_code: z.string().nullable().optional(),
  amount: Money.nullable().optional(),
  ending_balance: Money.nullable().optional(),
  note: z.string().nullable().optional(),
  created_by: CreditAdjustmentCreatedBy.nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional()
});
export type CreditAdjustment = z.infer<typeof CreditAdjustment>;

/** Envelope returned by single-credit-adjustment endpoints. */
export const CreditAdjustmentResponse = z.object({
  credit_adjustment: CreditAdjustment
});
export type CreditAdjustmentResponse = z.infer<typeof CreditAdjustmentResponse>;

/** Query parameters accepted by `GET /credit_accounts`. */
export const CreditAccountListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  customer_id: z.string().optional(),
  credit_type: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional()
});
export type CreditAccountListParams = z.infer<typeof CreditAccountListParams>;

/** Query parameters accepted by the credit-adjustment list endpoints. */
export const CreditAdjustmentListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  credit_account_id: z.string().optional(),
  adjustment_type: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional()
});
export type CreditAdjustmentListParams = z.infer<
  typeof CreditAdjustmentListParams
>;

/** Body for `POST /credit_accounts`. */
export const CreditAccountCreateBody = z.looseObject({
  name: z.string().optional(),
  credit_type: z.string().optional(),
  customer_id: z.number().optional(),
  currency_code: z.string().optional(),
  external_id: ExternalId.optional(),
  external_customer_id: ExternalId.optional()
});
export type CreditAccountCreateBody = z.infer<typeof CreditAccountCreateBody>;

/** Body for `PUT /credit_accounts/{id}`. */
export const CreditAccountUpdateBody = z.looseObject({
  name: z.string().optional(),
  credit_type: z.string().optional(),
  external_id: ExternalId.optional()
});
export type CreditAccountUpdateBody = z.infer<typeof CreditAccountUpdateBody>;

/** Body for `POST /credit_accounts/{id}/credit_adjustments`. */
export const CreditAdjustmentCreateBody = z.looseObject({
  adjustment_type: z.string().optional(),
  currency_code: z.string().optional(),
  amount: z.string().optional(),
  description: z.string().optional(),
  expires_at: z.string().optional(),
  source_reference: z.string().optional()
});
export type CreditAdjustmentCreateBody = z.infer<
  typeof CreditAdjustmentCreateBody
>;
