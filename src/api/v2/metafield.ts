import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage metafields on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/metafields
 */
class MetafieldResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "metafields";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Create a new metafield.
   *
   * `POST /metafields`
   *
   * @param body - The metafield payload.
   * @returns The created metafield record.
   */
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Retrieve a single metafield.
   *
   * `GET /metafields/{metafieldId}`
   *
   * @param metafieldId - The Recharge metafield ID.
   * @returns The metafield record.
   */
  get(metafieldId: number): Promise<unknown> {
    return this._get(`${this.url}/${metafieldId}`);
  }

  /**
   * Update an existing metafield.
   *
   * `PUT /metafields/{metafieldId}`
   *
   * @param metafieldId - The Recharge metafield ID.
   * @param body - The fields to update.
   * @returns The updated metafield record.
   */
  update(metafieldId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${metafieldId}`, body);
  }

  /**
   * Delete a metafield.
   *
   * `DELETE /metafields/{metafieldId}`
   *
   * @param metafieldId - The Recharge metafield ID.
   * @returns The API response for the deletion.
   */
  delete(metafieldId: number): Promise<unknown> {
    return this._delete(`${this.url}/${metafieldId}`);
  }

  /**
   * List metafields, paginating through all results.
   *
   * `GET /metafields`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of metafield records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "metafields", query);
  }
}

export { MetafieldResource };
