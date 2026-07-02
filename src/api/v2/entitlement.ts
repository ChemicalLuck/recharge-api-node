import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  Entitlement,
  EntitlementResponse,
  type EntitlementListParams,
  type EntitlementCreateBody,
  type EntitlementUpdateBody
} from "~/models/api/v2/entitlement";
import RechargeResource from "../resource";

/**
 * Manage entitlements on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/entitlements
 */
class EntitlementResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "entitlements";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Create a new entitlement.
   *
   * `POST /entitlements`
   *
   * @param body - The entitlement payload.
   * @returns The created entitlement record.
   */
  create(body: EntitlementCreateBody): Promise<EntitlementResponse> {
    return this._post(`${this.url}`, body, EntitlementResponse);
  }

  /**
   * Update an existing entitlement.
   *
   * `PUT /entitlements/{entitlementId}`
   *
   * @param entitlementId - The Recharge entitlement ID.
   * @param body - The fields to update.
   * @returns The updated entitlement record.
   */
  update(
    entitlementId: number,
    body: EntitlementUpdateBody
  ): Promise<EntitlementResponse> {
    return this._put(`${this.url}/${entitlementId}`, body, EntitlementResponse);
  }

  /**
   * Delete an entitlement.
   *
   * `DELETE /entitlements/{entitlementId}`
   *
   * @param entitlementId - The Recharge entitlement ID.
   * @returns The API response for the deletion.
   */
  delete(entitlementId: number): Promise<undefined> {
    return this._delete(`${this.url}/${entitlementId}`);
  }

  /**
   * List entitlements, paginating through all results.
   *
   * `GET /entitlements`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of entitlement records.
   */
  list(query?: EntitlementListParams): Promise<Entitlement[]> {
    return this._paginate(
      `${this.url}`,
      "entitlements",
      query as Record<string, string> | undefined,
      Entitlement
    );
  }
}

export { EntitlementResource };
