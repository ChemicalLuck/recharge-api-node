import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  Metafield,
  MetafieldResponse,
  type MetafieldListParams,
  type MetafieldCreateBody,
  type MetafieldUpdateBody
} from "~/models/api/v2/metafield";
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
  create(body: MetafieldCreateBody): Promise<MetafieldResponse> {
    return this._post(`${this.url}`, body, MetafieldResponse);
  }

  /**
   * Retrieve a single metafield.
   *
   * `GET /metafields/{metafieldId}`
   *
   * @param metafieldId - The Recharge metafield ID.
   * @returns The metafield record.
   */
  get(metafieldId: number): Promise<MetafieldResponse> {
    return this._get(
      `${this.url}/${metafieldId}`,
      undefined,
      MetafieldResponse
    );
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
  update(
    metafieldId: number,
    body: MetafieldUpdateBody
  ): Promise<MetafieldResponse> {
    return this._put(`${this.url}/${metafieldId}`, body, MetafieldResponse);
  }

  /**
   * Delete a metafield.
   *
   * `DELETE /metafields/{metafieldId}`
   *
   * @param metafieldId - The Recharge metafield ID.
   * @returns The API response for the deletion.
   */
  delete(metafieldId: number): Promise<undefined> {
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
  list(query?: MetafieldListParams): Promise<Metafield[]> {
    return this._paginate(
      `${this.url}`,
      "metafields",
      query as Record<string, string> | undefined,
      Metafield
    );
  }
}

export { MetafieldResource };
