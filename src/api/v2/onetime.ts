import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  Onetime,
  OnetimeResponse,
  type OnetimeListParams,
  type OnetimeCreate,
  type OnetimeUpdate
} from "~/models/api/v2/onetime";
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
  create(body: OnetimeCreate): Promise<OnetimeResponse> {
    return this._post(`${this.url}`, body, OnetimeResponse);
  }

  /**
   * Retrieve a single one-time product.
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
   * Update an existing one-time product.
   *
   * `PUT /onetimes/{onetimeId}`
   *
   * @param onetimeId - The Recharge one-time product ID.
   * @param body - The fields to update.
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
   * List one-time products, paginating through all results.
   *
   * `GET /onetimes`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of one-time product records.
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
