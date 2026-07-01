import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage customer addresses on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/addresses
 */
class AddressResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "addresses";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Create a new address.
   *
   * `POST /addresses`
   *
   * @param body - The address payload.
   * @returns The created address record.
   */
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Retrieve a single address.
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
   * Update an existing address.
   *
   * `PUT /addresses/{addressId}`
   *
   * @param addressId - The Recharge address ID.
   * @param body - The fields to update.
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
   * List addresses, paginating through all results.
   *
   * `GET /addresses`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of address records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "addresses", query);
  }

  /**
   * Merge two or more addresses into one.
   *
   * `POST /addresses/merge`
   *
   * @param body - The merge payload describing the source and target addresses.
   * @returns The merged address record.
   */
  merge(body: object): Promise<unknown> {
    return this._post(`${this.url}/merge`, body);
  }

  /**
   * Skip the next future charge for an address.
   *
   * `POST /addresses/{addressId}/charges/skip`
   *
   * @param addressId - The Recharge address ID.
   * @param body - The payload describing which future charge to skip.
   * @returns The API response for the skip.
   */
  skipFutureCharge(addressId: number, body: object): Promise<unknown> {
    return this._post(`${this.url}/${addressId}/charges/skip`, body);
  }
}

export { AddressResource };
