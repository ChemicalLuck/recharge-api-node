import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  Discount,
  DiscountResponse,
  type DiscountListParams,
  type DiscountCreateBody,
  type DiscountUpdateBody
} from "~/models/api/v2/discount";
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
  create(body: DiscountCreateBody): Promise<DiscountResponse> {
    return this._post(`${this.url}`, body, DiscountResponse);
  }

  /**
   * Retrieve a single discount.
   *
   * `GET /discounts/{discountId}`
   *
   * @param discountId - The Recharge discount ID.
   * @returns The discount record.
   */
  get(discountId: number): Promise<DiscountResponse> {
    return this._get(`${this.url}/${discountId}`, undefined, DiscountResponse);
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
  update(
    discountId: number,
    body: DiscountUpdateBody
  ): Promise<DiscountResponse> {
    return this._put(`${this.url}/${discountId}`, body, DiscountResponse);
  }

  /**
   * Delete a discount.
   *
   * `DELETE /discounts/{discountId}`
   *
   * @param discountId - The Recharge discount ID.
   * @returns The API response for the deletion.
   */
  delete(discountId: number): Promise<undefined> {
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
  list(query?: DiscountListParams): Promise<Discount[]> {
    return this._paginate(
      `${this.url}`,
      "discounts",
      query as Record<string, string> | undefined,
      Discount
    );
  }
}

export { DiscountResource };
