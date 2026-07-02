import { z } from "zod";
import { AddressSummary } from "~/models/api/common";

/**
 * Processor-specific payment details on a payment method (2021-11).
 *
 * The populated fields depend on `payment_type` (e.g. card fields for
 * `CREDIT_CARD`, `paypal_email` for `PAYPAL`).
 */
export const PaymentDetails = z.looseObject({
  brand: z.string().nullable().optional(),
  exp_month: z.number().nullable().optional(),
  exp_year: z.number().nullable().optional(),
  last4: z.union([z.number(), z.string()]).nullable().optional(),
  card_type: z.string().nullable().optional(),
  funding_type: z.string().nullable().optional(),
  wallet_type: z.string().nullable().optional(),
  paypal_email: z.string().nullable().optional(),
  waived_processing_fee: z.boolean().nullable().optional()
});
export type PaymentDetails = z.infer<typeof PaymentDetails>;

/**
 * A Recharge payment method (2021-11).
 *
 * @see https://developer.rechargepayments.com/2021-11/payment_methods/payment_methods_object
 */
export const PaymentMethod = z.looseObject({
  id: z.number(),
  customer_id: z.number(),
  payment_type: z
    .enum(["CREDIT_CARD", "PAYPAL", "APPLE_PAY", "GOOGLE_PAY", "SEPA_DEBIT"])
    .nullable()
    .optional(),
  processor_name: z.string().nullable().optional(),
  processor_customer_token: z.string().nullable().optional(),
  processor_payment_method_token: z.string().nullable().optional(),
  default: z.boolean().nullable().optional(),
  taxable: z.boolean().nullable().optional(),
  status: z.string().nullable().optional(),
  status_reason: z.string().nullable().optional(),
  retry_date: z.string().nullable().optional(),
  payment_details: PaymentDetails.nullable().optional(),
  billing_address: AddressSummary.nullable().optional(),
  created_at: z.string(),
  updated_at: z.string()
});
export type PaymentMethod = z.infer<typeof PaymentMethod>;

/** Envelope returned by single-payment-method endpoints. */
export const PaymentMethodResponse = z.object({
  payment_method: PaymentMethod
});
export type PaymentMethodResponse = z.infer<typeof PaymentMethodResponse>;

/** Query parameters accepted by `GET /payment_methods`. */
export const PaymentMethodListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  customer_id: z.string().optional()
});
export type PaymentMethodListParams = z.infer<typeof PaymentMethodListParams>;

/** Body for `POST /payment_methods`. */
export const PaymentMethodCreate = z.looseObject({
  customer_id: z.number().optional(),
  payment_type: z.string().optional(),
  processor_name: z.string().optional(),
  processor_customer_token: z.string().optional(),
  processor_payment_method_token: z.string().optional(),
  default: z.boolean().optional(),
  billing_address: AddressSummary.optional(),
  payment_details: PaymentDetails.optional()
});
export type PaymentMethodCreate = z.infer<typeof PaymentMethodCreate>;

/** Body for `PUT /payment_methods/{id}`. */
export const PaymentMethodUpdate = z.looseObject({
  default: z.boolean().optional(),
  processor_name: z.string().optional(),
  processor_customer_token: z.string().optional(),
  processor_payment_method_token: z.string().optional(),
  billing_address: AddressSummary.optional(),
  payment_details: PaymentDetails.optional()
});
export type PaymentMethodUpdate = z.infer<typeof PaymentMethodUpdate>;
