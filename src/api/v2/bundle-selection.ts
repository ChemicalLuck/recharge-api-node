import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage bundle selections on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/bundle_selections
 */
class BundleSelectionResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "bundle_selections";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Create a new bundle selection.
   *
   * `POST /bundle_selections`
   *
   * @param body - The bundle selection payload.
   * @returns The created bundle selection record.
   */
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Retrieve a single bundle selection.
   *
   * `GET /bundle_selections/{bundleSelectionId}`
   *
   * @param bundleSelectionId - The Recharge bundle selection ID.
   * @returns The bundle selection record.
   */
  get(bundleSelectionId: number): Promise<unknown> {
    return this._get(`${this.url}/${bundleSelectionId}`);
  }

  /**
   * Update an existing bundle selection.
   *
   * `PUT /bundle_selections/{bundleSelectionId}`
   *
   * @param bundleSelectionId - The Recharge bundle selection ID.
   * @param body - The fields to update.
   * @returns The updated bundle selection record.
   */
  update(bundleSelectionId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${bundleSelectionId}`, body);
  }

  /**
   * Delete a bundle selection.
   *
   * `DELETE /bundle_selections/{bundleSelectionId}`
   *
   * @param bundleSelectionId - The Recharge bundle selection ID.
   * @returns The API response for the deletion.
   */
  delete(bundleSelectionId: number): Promise<unknown> {
    return this._delete(`${this.url}/${bundleSelectionId}`);
  }

  /**
   * List bundle selections, paginating through all results.
   *
   * `GET /bundle_selections`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of bundle selection records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "bundle_selections", query);
  }
}

export { BundleSelectionResource };
