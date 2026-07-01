import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage subscription plans on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/plans
 */
class PlanResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "plans";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Create a new plan.
   *
   * `POST /plans`
   *
   * @param body - The plan payload.
   * @returns The created plan record.
   */
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Update an existing plan.
   *
   * `PUT /plans/{planId}`
   *
   * @param planId - The Recharge plan ID.
   * @param body - The fields to update.
   * @returns The updated plan record.
   */
  update(planId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${planId}`, body);
  }

  /**
   * Delete a plan.
   *
   * `DELETE /plans/{planId}`
   *
   * @param planId - The Recharge plan ID.
   * @returns The API response for the deletion.
   */
  delete(planId: number): Promise<unknown> {
    return this._delete(`${this.url}/${planId}`);
  }

  /**
   * List plans, paginating through all results.
   *
   * `GET /plans`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of plan records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "plans", query);
  }

  /**
   * Create multiple plans in a single request.
   *
   * `POST /plans/bulk`
   *
   * @param body - The payload listing the plans to create.
   * @returns The created plan records.
   */
  bulkCreate(body: object): Promise<unknown> {
    return this._post(`${this.url}/bulk`, body);
  }

  /**
   * Update multiple plans in a single request.
   *
   * `PUT /plans/bulk`
   *
   * @param body - The payload listing the plans to update.
   * @returns The updated plan records.
   */
  bulkUpdate(body: object): Promise<unknown> {
    return this._put(`${this.url}/bulk`, body);
  }

  /**
   * Delete multiple plans in a single request.
   *
   * `DELETE /plans/bulk`
   *
   * @param body - The payload listing the plans to delete.
   * @returns The API response for the bulk deletion.
   */
  bulkDelete(body: object): Promise<unknown> {
    return this._delete(`${this.url}/bulk`, body);
  }
}

export { PlanResource };
