import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage one-time products on the Recharge 2021-01 API.
 *
 * @see https://developer.rechargepayments.com/2021-01/onetimes
 */
class OnetimeResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "onetimes";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  /**
   * Create a one-time product.
   *
   * `POST /onetimes`
   *
   * @param body - The one-time product attributes to create.
   * @returns The created one-time product record.
   */
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Retrieve a one-time product.
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
   * Update a one-time product.
   *
   * `PUT /onetimes/{onetimeId}`
   *
   * @param onetimeId - The Recharge one-time product ID.
   * @param body - The one-time product attributes to update.
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
   * List one-time products.
   *
   * `GET /onetimes`
   *
   * @param query - Optional query parameters for filtering and pagination.
   * @returns The paginated list of one-time product records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "onetimes", query);
  }
}

export { OnetimeResource };
