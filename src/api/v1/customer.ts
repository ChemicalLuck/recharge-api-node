import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage customers on the Recharge 2021-01 API.
 *
 * @see https://developer.rechargepayments.com/2021-01/customers
 */
class CustomerResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "customers";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  /**
   * Create a customer.
   *
   * `POST /customers`
   *
   * @param body - The customer attributes to create.
   * @returns The created customer record.
   */
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Retrieve a customer.
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
   * Update a customer.
   *
   * `PUT /customers/{customerId}`
   *
   * @param customerId - The Recharge customer ID.
   * @param body - The customer attributes to update.
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
   * List customers.
   *
   * `GET /customers`
   *
   * @param query - Optional query parameters for filtering and pagination.
   * @returns The paginated list of customer records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "customers", query);
  }

  /**
   * Count customers.
   *
   * `GET /customers/count`
   *
   * @param query - Optional query parameters for filtering the count.
   * @returns The customer count.
   */
  count(query?: Record<string, string>): Promise<unknown> {
    return this._get(`${this.url}/count`, query);
  }

  /**
   * Retrieve the payment sources for a customer.
   *
   * `GET /customers/{customerId}/payment_sources`
   *
   * @param customerId - The Recharge customer ID.
   * @returns The customer's payment sources.
   */
  payment_sources(customerId: number): Promise<unknown> {
    return this._get(`${this.url}/${customerId}/payment_sources`);
  }
}

export { CustomerResource };
