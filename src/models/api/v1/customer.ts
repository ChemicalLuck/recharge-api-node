import { z } from "zod";
import { AnalyticsData } from "~/models/api/common";

/**
 * A Recharge customer (2021-01).
 *
 * @see https://developer.rechargepayments.com/2021-01/customers/customers_object
 */
export const Customer = z.looseObject({
  id: z.number(),
  hash: z.string().nullable().optional(),
  external_customer_id: z
    .looseObject({ ecommerce: z.string().nullable().optional() })
    .nullable()
    .optional(),
  shopify_customer_id: z.string().nullable().optional(),
  email: z.string(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  accepts_marketing: z.boolean().nullable().optional(),
  billing_address1: z.string().nullable().optional(),
  billing_address2: z.string().nullable().optional(),
  billing_city: z.string().nullable().optional(),
  billing_company: z.string().nullable().optional(),
  billing_country: z.string().nullable().optional(),
  billing_first_name: z.string().nullable().optional(),
  billing_last_name: z.string().nullable().optional(),
  billing_phone: z.string().nullable().optional(),
  billing_province: z.string().nullable().optional(),
  billing_zip: z.string().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
  first_charge_processed_at: z.string().nullable().optional(),
  subscriptions_active_count: z.number().nullable().optional(),
  subscriptions_total_count: z.number().nullable().optional(),
  number_active_subscriptions: z.number().nullable().optional(),
  number_subscriptions: z.number().nullable().optional(),
  has_valid_payment_method: z.boolean().nullable().optional(),
  has_payment_method_in_dunning: z.boolean().nullable().optional(),
  has_card_error_in_dunning: z.boolean().nullable().optional(),
  processor_type: z.string().nullable().optional(),
  reason_payment_method_not_valid: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  stripe_customer_token: z.string().nullable().optional(),
  tax_exempt: z.boolean().nullable().optional(),
  apply_credit_to_next_recurring_charge: z.boolean().nullable().optional(),
  analytics_data: AnalyticsData.nullable().optional()
});
export type Customer = z.infer<typeof Customer>;

/** Envelope returned by single-customer endpoints. */
export const CustomerResponse = z.object({ customer: Customer });
export type CustomerResponse = z.infer<typeof CustomerResponse>;

/** Query parameters accepted by `GET /customers`. */
export const CustomerListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  email: z.string().optional(),
  hash: z.string().optional(),
  shopify_customer_id: z.string().optional(),
  sort_by: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional()
});
export type CustomerListParams = z.infer<typeof CustomerListParams>;

/** Query parameters accepted by `GET /customers/count`. */
export const CustomerCountParams = z.looseObject({
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional()
});
export type CustomerCountParams = z.infer<typeof CustomerCountParams>;

/** Body for `POST /customers`. */
export const CustomerCreate = z.looseObject({
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  billing_address1: z.string().optional(),
  billing_address2: z.string().optional(),
  billing_city: z.string().optional(),
  billing_company: z.string().optional(),
  billing_country: z.string().optional(),
  billing_first_name: z.string().optional(),
  billing_last_name: z.string().optional(),
  billing_phone: z.string().optional(),
  billing_province: z.string().optional(),
  billing_zip: z.string().optional(),
  shopify_customer_id: z.string().optional(),
  tax_exempt: z.boolean().optional(),
  analytics_data: AnalyticsData.optional()
});
export type CustomerCreate = z.infer<typeof CustomerCreate>;

/** Body for `PUT /customers/{id}`. */
export const CustomerUpdate = z.looseObject({
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  billing_address1: z.string().optional(),
  billing_address2: z.string().optional(),
  billing_city: z.string().optional(),
  billing_company: z.string().optional(),
  billing_country: z.string().optional(),
  billing_first_name: z.string().optional(),
  billing_last_name: z.string().optional(),
  billing_phone: z.string().optional(),
  billing_province: z.string().optional(),
  billing_zip: z.string().optional(),
  shopify_customer_id: z.string().optional(),
  tax_exempt: z.boolean().optional(),
  apply_credit_to_next_recurring_charge: z.boolean().optional(),
  analytics_data: AnalyticsData.optional()
});
export type CustomerUpdate = z.infer<typeof CustomerUpdate>;

/** A saved payment source on a customer. */
export const CustomerPaymentSource = z.looseObject({
  id: z.number().nullable().optional(),
  customer_id: z.number().nullable().optional(),
  payment_type: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  status_reason: z.string().nullable().optional(),
  has_card_error_in_dunning: z.boolean().nullable().optional(),
  payment_token: z.string().nullable().optional(),
  processor_name: z.string().nullable().optional(),
  processor_customer_token: z.string().nullable().optional(),
  processor_payment_method_token: z.string().nullable().optional(),
  paypal_email: z.string().nullable().optional(),
  paypal_customer_billing_agreement_id: z.string().nullable().optional(),
  card_brand: z.string().nullable().optional(),
  card_exp_month: z.number().nullable().optional(),
  card_exp_year: z.number().nullable().optional(),
  card_last4: z.string().nullable().optional(),
  cardholder_name: z.string().nullable().optional(),
  billing_address: z
    .looseObject({
      id: z.number().nullable().optional(),
      address1: z.string().nullable().optional(),
      address2: z.string().nullable().optional(),
      city: z.string().nullable().optional(),
      company: z.string().nullable().optional(),
      country: z.string().nullable().optional(),
      first_name: z.string().nullable().optional(),
      last_name: z.string().nullable().optional(),
      phone: z.string().nullable().optional(),
      province: z.string().nullable().optional(),
      zip: z.string().nullable().optional()
    })
    .nullable()
    .optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional()
});
export type CustomerPaymentSource = z.infer<typeof CustomerPaymentSource>;

/**
 * Response for `GET /customers/{id}/payment_sources`.
 *
 * @see https://developer.rechargepayments.com/2021-01/customers/customers_payment_source
 */
export const CustomerPaymentSourcesResponse = z.looseObject({
  payment_sources: z.array(CustomerPaymentSource).nullable().optional()
});
export type CustomerPaymentSourcesResponse = z.infer<
  typeof CustomerPaymentSourcesResponse
>;
