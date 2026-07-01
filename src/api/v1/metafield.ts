import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage metafields on the Recharge 2021-01 API.
 *
 * @see https://developer.rechargepayments.com/2021-01/metafields
 */
class MetafieldResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "metafields";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  /**
   * Create a metafield.
   *
   * `POST /metafields`
   *
   * @param body - The metafield attributes to create.
   * @returns The created metafield record.
   */
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Retrieve a metafield.
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
   * Update a metafield.
   *
   * `PUT /metafields/{metafieldId}`
   *
   * @param metafieldId - The Recharge metafield ID.
   * @param body - The metafield attributes to update.
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
   * List metafields.
   *
   * `GET /metafields`
   *
   * @param query - Optional query parameters for filtering and pagination.
   * @returns The paginated list of metafield records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "metafields", query);
  }

  /**
   * Count metafields.
   *
   * `GET /metafields/count`
   *
   * @param query - Optional query parameters for filtering the count.
   * @returns The metafield count.
   */
  count(query?: Record<string, string>): Promise<unknown> {
    return this._get(`${this.url}/count`, query);
  }
}

export { MetafieldResource };
