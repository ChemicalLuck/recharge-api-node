import { z } from "zod";
import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  Discount,
  DiscountResponse,
  type DiscountListParams,
  type DiscountCreateBody,
  type DiscountUpdateBody,
  type DiscountApplyBody
} from "~/models/api/v1/discount";
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
  create(body: DiscountCreateBody): Promise<DiscountResponse> {
    return this._post(`${this.url}`, body, DiscountResponse);
  }

  /**
   * Retrieve a discount.
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
   * Update a discount.
   *
   * `PUT /discounts/{discountId}`
   *
   * @param discountId - The Recharge discount ID.
   * @param body - The discount attributes to update.
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
   * List discounts.
   *
   * `GET /discounts`
   *
   * @param query - Optional query parameters for filtering and pagination.
   * @returns The paginated list of discount records.
   */
  list(query?: DiscountListParams): Promise<Discount[]> {
    return this._paginate(
      `${this.url}`,
      "discounts",
      query as Record<string, string> | undefined,
      Discount
    );
  }

  /**
   * Count discounts.
   *
   * `GET /discounts/count`
   *
   * @param query - Optional query parameters for filtering the count.
   * @returns The discount count.
   */
  count(query?: DiscountListParams): Promise<{ count: number }> {
    return this._get(
      `${this.url}/count`,
      query as Record<string, string> | undefined,
      z.object({ count: z.number() })
    );
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
  applyToAddress(
    addressId: number,
    body: DiscountApplyBody
  ): Promise<{ address?: unknown }> {
    return this._post(
      `${this.baseUrl}/addresses/${addressId}/discounts`,
      body,
      z.looseObject({ address: z.unknown().optional() })
    );
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
  applyToCharge(
    chargeId: number,
    body: DiscountApplyBody
  ): Promise<{ charge?: unknown }> {
    return this._post(
      `${this.baseUrl}/charges/${chargeId}/discounts`,
      body,
      z.looseObject({ charge: z.unknown().optional() })
    );
  }

  /**
   * Remove a discount.
   *
   * `POST /discounts/{discountId}/remove`
   *
   * @param discountId - The Recharge discount ID.
   * @returns The updated discount record.
   */
  remove(discountId: number): Promise<DiscountResponse> {
    return this._post(
      `${this.url}/${discountId}/remove`,
      undefined,
      DiscountResponse
    );
  }
}

export { DiscountResource };
