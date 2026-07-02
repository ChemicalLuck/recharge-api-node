import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  Onetime,
  OnetimeResponse,
  type OnetimeListParams,
  type OnetimeCreate,
  type OnetimeUpdate
} from "~/models/api/v1/onetime";
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
  create(body: OnetimeCreate): Promise<OnetimeResponse> {
    return this._post(`${this.url}`, body, OnetimeResponse);
  }

  /**
   * Retrieve a one-time product.
   *
   * `GET /onetimes/{onetimeId}`
   *
   * @param onetimeId - The Recharge one-time product ID.
   * @returns The one-time product record.
   */
  get(onetimeId: number): Promise<OnetimeResponse> {
    return this._get(`${this.url}/${onetimeId}`, undefined, OnetimeResponse);
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
  update(onetimeId: number, body: OnetimeUpdate): Promise<OnetimeResponse> {
    return this._put(`${this.url}/${onetimeId}`, body, OnetimeResponse);
  }

  /**
   * Delete a one-time product.
   *
   * `DELETE /onetimes/{onetimeId}`
   *
   * @param onetimeId - The Recharge one-time product ID.
   * @returns The API response for the deletion.
   */
  delete(onetimeId: number): Promise<undefined> {
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
  list(query?: OnetimeListParams): Promise<Onetime[]> {
    return this._paginate(
      `${this.url}`,
      "onetimes",
      query as Record<string, string> | undefined,
      Onetime
    );
  }
}

export { OnetimeResource };
