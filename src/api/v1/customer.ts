import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import { z } from "zod";
import {
  Customer,
  CustomerResponse,
  CustomerPaymentSourcesResponse,
  type CustomerListParams,
  type CustomerCountParams,
  type CustomerCreate,
  type CustomerUpdate
} from "~/models/api/v1/customer";
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
  create(body: CustomerCreate): Promise<CustomerResponse> {
    return this._post(`${this.url}`, body, CustomerResponse);
  }

  /**
   * Retrieve a customer.
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
   * Update a customer.
   *
   * `PUT /customers/{customerId}`
   *
   * @param customerId - The Recharge customer ID.
   * @param body - The customer attributes to update.
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
   * List customers.
   *
   * `GET /customers`
   *
   * @param query - Optional query parameters for filtering and pagination.
   * @returns The paginated list of customer records.
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
   * Count customers.
   *
   * `GET /customers/count`
   *
   * @param query - Optional query parameters for filtering the count.
   * @returns The customer count.
   */
  count(query?: CustomerCountParams): Promise<{ count: number }> {
    return this._get(
      `${this.url}/count`,
      query as Record<string, string> | undefined,
      z.object({ count: z.number() })
    );
  }

  /**
   * Retrieve the payment sources for a customer.
   *
   * `GET /customers/{customerId}/payment_sources`
   *
   * @param customerId - The Recharge customer ID.
   * @returns The customer's payment sources.
   */
  payment_sources(customerId: number): Promise<CustomerPaymentSourcesResponse> {
    return this._get(
      `${this.url}/${customerId}/payment_sources`,
      undefined,
      CustomerPaymentSourcesResponse
    );
  }
}

export { CustomerResource };
