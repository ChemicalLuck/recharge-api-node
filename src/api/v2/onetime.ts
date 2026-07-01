import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage one-time products on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/onetimes
 */
class OnetimeResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "onetimes";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Create a new one-time product.
   *
   * `POST /onetimes`
   *
   * @param body - The one-time product payload.
   * @returns The created one-time product record.
   */
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Retrieve a single one-time product.
   *
   * `GET /onetimes/{onetimeId}`
   *
   * @param onetimeId - The Recharge one-time product ID.
   * @returns The one-time product record.
   */
  get(onetimeId: number): Promise<unknown> {
    return this._get(`${this.url}/${onetimeId}`);
  }

  /**
   * Update an existing one-time product.
   *
   * `PUT /onetimes/{onetimeId}`
   *
   * @param onetimeId - The Recharge one-time product ID.
   * @param body - The fields to update.
   * @returns The updated one-time product record.
   */
  update(onetimeId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${onetimeId}`, body);
  }

  /**
   * Delete a one-time product.
   *
   * `DELETE /onetimes/{onetimeId}`
   *
   * @param onetimeId - The Recharge one-time product ID.
   * @returns The API response for the deletion.
   */
  delete(onetimeId: number): Promise<unknown> {
    return this._delete(`${this.url}/${onetimeId}`);
  }

  /**
   * List one-time products, paginating through all results.
   *
   * `GET /onetimes`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of one-time product records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "onetimes", query);
  }
}

export { OnetimeResource };
