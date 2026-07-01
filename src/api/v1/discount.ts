import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage discounts on the Recharge 2021-01 API.
 *
 * @see https://developer.rechargepayments.com/2021-01/discounts
 */
class DiscountResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "discounts";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  /**
   * Create a discount.
   *
   * `POST /discounts`
   *
   * @param body - The discount attributes to create.
   * @returns The created discount record.
   */
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Retrieve a discount.
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
   * Update a discount.
   *
   * `PUT /discounts/{discountId}`
   *
   * @param discountId - The Recharge discount ID.
   * @param body - The discount attributes to update.
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
   * List discounts.
   *
   * `GET /discounts`
   *
   * @param query - Optional query parameters for filtering and pagination.
   * @returns The paginated list of discount records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "discounts", query);
  }

  /**
   * Count discounts.
   *
   * `GET /discounts/count`
   *
   * @param query - Optional query parameters for filtering the count.
   * @returns The discount count.
   */
  count(query?: Record<string, string>): Promise<unknown> {
    return this._get(`${this.url}/count`, query);
  }

  /**
   * Apply a discount to an address.
   *
   * `POST /addresses/{addressId}/discounts`
   *
   * @param addressId - The Recharge address ID.
   * @param body - The discount to apply.
   * @returns The updated address record.
   */
  applyToAddress(addressId: number, body: object): Promise<unknown> {
    return this._post(`${this.baseUrl}/addresses/${addressId}/discounts`, body);
  }

  /**
   * Apply a discount to a charge.
   *
   * `POST /charges/{chargeId}/discounts`
   *
   * @param chargeId - The Recharge charge ID.
   * @param body - The discount to apply.
   * @returns The updated charge record.
   */
  applyToCharge(chargeId: number, body: object): Promise<unknown> {
    return this._post(`${this.baseUrl}/charges/${chargeId}/discounts`, body);
  }

  /**
   * Remove a discount.
   *
   * `POST /discounts/{discountId}/remove`
   *
   * @param discountId - The Recharge discount ID.
   * @returns The updated discount record.
   */
  remove(discountId: number): Promise<unknown> {
    return this._post(`${this.url}/${discountId}/remove`);
  }
}

export { DiscountResource };
