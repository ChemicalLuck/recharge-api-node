import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
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
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Retrieve a single customer.
   *
   * `GET /customers/{customerId}`
   *
   * @param customerId - The Recharge customer ID.
   * @returns The customer record.
   */
  get(customerId: number): Promise<unknown> {
    return this._get(`${this.url}/${customerId}`);
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
  update(customerId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${customerId}`, body);
  }

  /**
   * Delete a customer.
   *
   * `DELETE /customers/{customerId}`
   *
   * @param customerId - The Recharge customer ID.
   * @returns The API response for the deletion.
   */
  delete(customerId: number): Promise<unknown> {
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
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "customers", query);
  }

  /**
   * Retrieve the delivery schedule for a customer.
   *
   * `GET /customers/{customerId}/delivery_schedule`
   *
   * @param customerId - The Recharge customer ID.
   * @returns The customer's delivery schedule.
   */
  deliverySchedule(customerId: number): Promise<unknown> {
    return this._get(`${this.url}/${customerId}/delivery_schedule`);
  }

  /**
   * Retrieve the credit summary for a customer.
   *
   * `GET /customers/{customerId}/credit_summary`
   *
   * @param customerId - The Recharge customer ID.
   * @returns The customer's credit summary.
   */
  creditSummary(customerId: number): Promise<unknown> {
    return this._get(`${this.url}/${customerId}/credit_summary`);
  }
}

export { CustomerResource };
