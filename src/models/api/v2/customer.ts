import { z } from "zod";
import { ExternalId, AnalyticsData } from "~/models/api/common";

/**
 * A Recharge customer (2021-11).
 *
 * @see https://developer.rechargepayments.com/2021-11/customers/customers_object
 */
export const Customer = z.looseObject({
  id: z.number(),
  hash: z.string().nullable().optional(),
  external_customer_id: ExternalId.nullable().optional(),
  email: z.string(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string(),
  first_charge_processed_at: z.string().nullable().optional(),
  subscription_related_charge_streak: z.number().nullable().optional(),
  subscriptions_active_count: z.number().nullable().optional(),
  subscriptions_total_count: z.number().nullable().optional(),
  has_valid_payment_method: z.boolean().nullable().optional(),
  has_payment_method_in_dunning: z.boolean().nullable().optional(),
  tax_exempt: z.boolean().nullable().optional(),
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
  cursor: z.string().optional(),
  email: z.string().optional(),
  hash: z.string().optional(),
  external_customer_id: z.string().optional(),
  sort_by: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional()
});
export type CustomerListParams = z.infer<typeof CustomerListParams>;

/** Body for `POST /customers`. */
export const CustomerCreate = z.looseObject({
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone: z.string().optional(),
  external_customer_id: ExternalId.optional(),
  tax_exempt: z.boolean().optional(),
  analytics_data: AnalyticsData.optional()
});
export type CustomerCreate = z.infer<typeof CustomerCreate>;

/** Body for `PUT /customers/{id}`. */
export const CustomerUpdate = z.looseObject({
  email: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone: z.string().optional(),
  external_customer_id: ExternalId.optional(),
  tax_exempt: z.boolean().optional(),
  analytics_data: AnalyticsData.optional()
});
export type CustomerUpdate = z.infer<typeof CustomerUpdate>;

/** A single item in a customer's delivery schedule. */
export const CustomerDeliveryScheduleItem = z.looseObject({
  date: z.string().nullable().optional(),
  orders: z.array(z.looseObject({})).nullable().optional(),
  charges: z.array(z.looseObject({})).nullable().optional()
});
export type CustomerDeliveryScheduleItem = z.infer<
  typeof CustomerDeliveryScheduleItem
>;

/**
 * Response for `GET /customers/{id}/delivery_schedule`.
 *
 * @see https://developer.rechargepayments.com/2021-11/customers/customer_delivery_schedule
 */
export const CustomerDeliveryScheduleResponse = z.looseObject({
  deliveries: z.array(CustomerDeliveryScheduleItem).nullable().optional()
});
export type CustomerDeliveryScheduleResponse = z.infer<
  typeof CustomerDeliveryScheduleResponse
>;

/**
 * Response for `GET /customers/{id}/credit_summary`.
 *
 * @see https://developer.rechargepayments.com/2021-11/customers/customer_credit_summary
 */
export const CustomerCreditSummaryResponse = z.looseObject({
  total_available_balance: z.string().nullable().optional(),
  currency_code: z.string().nullable().optional(),
  credit_accounts: z.array(z.looseObject({})).nullable().optional()
});
export type CustomerCreditSummaryResponse = z.infer<
  typeof CustomerCreditSummaryResponse
>;
