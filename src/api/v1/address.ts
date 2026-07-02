import RechargeResource from "../resource";
import type RechargeClient from "~/client";
import { z } from "zod";
import {
  Address,
  AddressResponse,
  AddressValidateResponse,
  type AddressListParams,
  type AddressCountParams,
  type AddressCreate,
  type AddressUpdate,
  type AddressValidateBody,
  type AddressApplyDiscountBody
} from "~/models/api/v1/address";

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
  create(customerId: number, body: AddressCreate): Promise<AddressResponse> {
    return this._post(
      `${this.baseUrl}/customers/${customerId}/addresses`,
      body,
      AddressResponse
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
  get(addressId: number): Promise<AddressResponse> {
    return this._get(`${this.url}/${addressId}`, undefined, AddressResponse);
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
  update(addressId: number, body: AddressUpdate): Promise<AddressResponse> {
    return this._put(`${this.url}/${addressId}`, body, AddressResponse);
  }

  /**
   * Delete an address.
   *
   * `DELETE /addresses/{addressId}`
   *
   * @param addressId - The Recharge address ID.
   * @returns The API response for the deletion.
   */
  delete(addressId: number): Promise<undefined> {
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
  list(customerId: number, query?: AddressListParams): Promise<Address[]> {
    return this._paginate(
      `${this.baseUrl}/customers/${customerId}/addresses`,
      "addresses",
      query as Record<string, string> | undefined,
      Address
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
  count(query?: AddressCountParams): Promise<{ count: number }> {
    return this._get(
      `${this.url}/count`,
      query as Record<string, string> | undefined,
      z.object({ count: z.number() })
    );
  }

  /**
   * Validate an address.
   *
   * `POST /addresses/validate`
   *
   * @param body - The address attributes to validate.
   * @returns The validation result.
   */
  validate(body: AddressValidateBody): Promise<AddressValidateResponse> {
    return this._post(`${this.url}/validate`, body, AddressValidateResponse);
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
  applyDiscount(
    addressId: number,
    body: AddressApplyDiscountBody
  ): Promise<AddressResponse> {
    return this._post(
      `${this.url}/${addressId}/discounts`,
      body,
      AddressResponse
    );
  }
}

export { AddressResource };
