import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  Customer,
  CustomerResponse,
  CustomerDeliveryScheduleResponse,
  CustomerCreditSummaryResponse,
  type CustomerListParams,
  type CustomerCreate,
  type CustomerUpdate
} from "~/models/api/v2/customer";
import RechargeResource from "../resource";

/**
 * Manage customers on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/customers
 */
class CustomerResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "customers";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Create a new customer.
   *
   * `POST /customers`
   *
   * @param body - The customer payload.
   * @returns The created customer record.
   */
  create(body: CustomerCreate): Promise<CustomerResponse> {
    return this._post(`${this.url}`, body, CustomerResponse);
  }

  /**
   * Retrieve a single customer.
   *
   * `GET /customers/{customerId}`
   *
   * @param customerId - The Recharge customer ID.
   * @returns The customer record.
   */
  get(customerId: number): Promise<CustomerResponse> {
    return this._get(`${this.url}/${customerId}`, undefined, CustomerResponse);
  }

  /**
   * Update an existing customer.
   *
   * `PUT /customers/{customerId}`
   *
   * @param customerId - The Recharge customer ID.
   * @param body - The fields to update.
   * @returns The updated customer record.
   */
  update(customerId: number, body: CustomerUpdate): Promise<CustomerResponse> {
    return this._put(`${this.url}/${customerId}`, body, CustomerResponse);
  }

  /**
   * Delete a customer.
   *
   * `DELETE /customers/{customerId}`
   *
   * @param customerId - The Recharge customer ID.
   * @returns The API response for the deletion.
   */
  delete(customerId: number): Promise<undefined> {
    return this._delete(`${this.url}/${customerId}`);
  }

  /**
   * List customers, paginating through all results.
   *
   * `GET /customers`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of customer records.
   */
  list(query?: CustomerListParams): Promise<Customer[]> {
    return this._paginate(
      `${this.url}`,
      "customers",
      query as Record<string, string> | undefined,
      Customer
    );
  }

  /**
   * Retrieve the delivery schedule for a customer.
   *
   * `GET /customers/{customerId}/delivery_schedule`
   *
   * @param customerId - The Recharge customer ID.
   * @returns The customer's delivery schedule.
   */
  deliverySchedule(
    customerId: number
  ): Promise<CustomerDeliveryScheduleResponse> {
    return this._get(
      `${this.url}/${customerId}/delivery_schedule`,
      undefined,
      CustomerDeliveryScheduleResponse
    );
  }

  /**
   * Retrieve the credit summary for a customer.
   *
   * `GET /customers/{customerId}/credit_summary`
   *
   * @param customerId - The Recharge customer ID.
   * @returns The customer's credit summary.
   */
  creditSummary(customerId: number): Promise<CustomerCreditSummaryResponse> {
    return this._get(
      `${this.url}/${customerId}/credit_summary`,
      undefined,
      CustomerCreditSummaryResponse
    );
  }
}

export { CustomerResource };
