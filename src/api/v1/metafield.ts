import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  Metafield,
  MetafieldResponse,
  MetafieldCountResponse,
  type MetafieldListParams,
  type MetafieldCreateBody,
  type MetafieldUpdateBody
} from "~/models/api/v1/metafield";
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
  create(body: MetafieldCreateBody): Promise<MetafieldResponse> {
    return this._post(`${this.url}`, body, MetafieldResponse);
  }

  /**
   * Retrieve a metafield.
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
   * Update a metafield.
   *
   * `PUT /metafields/{metafieldId}`
   *
   * @param metafieldId - The Recharge metafield ID.
   * @param body - The metafield attributes to update.
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
   * List metafields.
   *
   * `GET /metafields`
   *
   * @param query - Optional query parameters for filtering and pagination.
   * @returns The paginated list of metafield records.
   */
  list(query?: MetafieldListParams): Promise<Metafield[]> {
    return this._paginate(
      `${this.url}`,
      "metafields",
      query as Record<string, string> | undefined,
      Metafield
    );
  }

  /**
   * Count metafields.
   *
   * `GET /metafields/count`
   *
   * @param query - Optional query parameters for filtering the count.
   * @returns The metafield count.
   */
  count(query?: MetafieldListParams): Promise<MetafieldCountResponse> {
    return this._get(
      `${this.url}/count`,
      query as Record<string, string> | undefined,
      MetafieldCountResponse
    );
  }
}

export { MetafieldResource };
