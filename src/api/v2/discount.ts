import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage discounts on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/discounts
 */
class DiscountResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "discounts";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Create a new discount.
   *
   * `POST /discounts`
   *
   * @param body - The discount payload.
   * @returns The created discount record.
   */
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Retrieve a single discount.
   *
   * `GET /discounts/{discountId}`
   *
   * @param discountId - The Recharge discount ID.
   * @returns The discount record.
   */
  get(discountId: number): Promise<unknown> {
    return this._get(`${this.url}/${discountId}`);
  }

  /**
   * Update an existing discount.
   *
   * `PUT /discounts/{discountId}`
   *
   * @param discountId - The Recharge discount ID.
   * @param body - The fields to update.
   * @returns The updated discount record.
   */
  update(discountId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${discountId}`, body);
  }

  /**
   * Delete a discount.
   *
   * `DELETE /discounts/{discountId}`
   *
   * @param discountId - The Recharge discount ID.
   * @returns The API response for the deletion.
   */
  delete(discountId: number): Promise<unknown> {
    return this._delete(`${this.url}/${discountId}`);
  }

  /**
   * List discounts, paginating through all results.
   *
   * `GET /discounts`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of discount records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "discounts", query);
  }
}

export { DiscountResource };
