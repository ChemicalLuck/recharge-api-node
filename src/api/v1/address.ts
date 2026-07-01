import RechargeResource from "../resource";
import type RechargeClient from "~/client";

/**
 * Manage customer shipping addresses on the Recharge 2021-01 API.
 *
 * @see https://developer.rechargepayments.com/2021-01/addresses
 */
class AddressResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "addresses";
  }

  /**
   * Create an address for a customer.
   *
   * `POST /customers/{customerId}/addresses`
   *
   * @param customerId - The Recharge customer ID.
   * @param body - The address attributes to create.
   * @returns The created address record.
   */
  create(customerId: number, body: object): Promise<unknown> {
    return this._post(
      `${this.baseUrl}/customers/${customerId}/addresses`,
      body
    );
  }

  /**
   * Retrieve an address.
   *
   * `GET /addresses/{addressId}`
   *
   * @param addressId - The Recharge address ID.
   * @returns The address record.
   */
  get(addressId: number): Promise<unknown> {
    return this._get(`${this.url}/${addressId}`);
  }

  /**
   * Update an address.
   *
   * `PUT /addresses/{addressId}`
   *
   * @param addressId - The Recharge address ID.
   * @param body - The address attributes to update.
   * @returns The updated address record.
   */
  update(addressId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${addressId}`, body);
  }

  /**
   * Delete an address.
   *
   * `DELETE /addresses/{addressId}`
   *
   * @param addressId - The Recharge address ID.
   * @returns The API response for the deletion.
   */
  delete(addressId: number): Promise<unknown> {
    return this._delete(`${this.url}/${addressId}`);
  }

  /**
   * List all addresses for a customer.
   *
   * `GET /customers/{customerId}/addresses`
   *
   * @param customerId - The Recharge customer ID.
   * @param query - Optional query parameters for filtering and pagination.
   * @returns The paginated list of address records.
   */
  list(customerId: number, query?: Record<string, string>): Promise<unknown> {
    return this._paginate(
      `${this.baseUrl}/customers/${customerId}/addresses`,
      "addresses",
      query
    );
  }

  /**
   * Count addresses.
   *
   * `GET /addresses/count`
   *
   * @param query - Optional query parameters for filtering the count.
   * @returns The address count.
   */
  count(query?: Record<string, string>): Promise<unknown> {
    return this._get(`${this.url}/count`, query);
  }

  /**
   * Validate an address.
   *
   * `POST /addresses/validate`
   *
   * @param body - The address attributes to validate.
   * @returns The validation result.
   */
  validate(body: unknown): Promise<unknown> {
    return this._post(`${this.url}/validate`, body);
  }

  /**
   * Apply a discount to an address.
   *
   * `POST /addresses/{addressId}/discounts`
   *
   * @param addressId - The Recharge address ID.
   * @param body - The discount to apply.
   * @returns The updated address record.
   */
  applyDiscount(addressId: number, body: unknown): Promise<unknown> {
    return this._post(`${this.url}/${addressId}/discounts`, body);
  }
}

export { AddressResource };
