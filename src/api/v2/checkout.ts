import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  CheckoutResponse,
  CheckoutShippingRatesResponse,
  CheckoutProcessResponse,
  type CheckoutCreateBody,
  type CheckoutUpdateBody,
  type CheckoutProcessBody
} from "~/models/api/v2/checkout";
import RechargeResource from "../resource";

/**
 * Manage checkouts on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/checkouts
 */
class CheckoutResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "checkouts";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Create a new checkout.
   *
   * `POST /checkouts`
   *
   * @param body - The checkout payload.
   * @returns The created checkout record.
   */
  create(body: CheckoutCreateBody): Promise<CheckoutResponse> {
    return this._post(`${this.url}`, body, CheckoutResponse);
  }

  /**
   * Retrieve a single checkout.
   *
   * `GET /checkouts/{checkoutId}`
   *
   * @param checkoutId - The Recharge checkout token.
   * @returns The checkout record.
   */
  get(checkoutId: string): Promise<CheckoutResponse> {
    return this._get(`${this.url}/${checkoutId}`, undefined, CheckoutResponse);
  }

  /**
   * Update an existing checkout.
   *
   * `PUT /checkouts/{checkoutId}`
   *
   * @param checkoutId - The Recharge checkout token.
   * @param body - The fields to update.
   * @returns The updated checkout record.
   */
  update(
    checkoutId: string,
    body: CheckoutUpdateBody
  ): Promise<CheckoutResponse> {
    return this._put(`${this.url}/${checkoutId}`, body, CheckoutResponse);
  }

  /**
   * Retrieve the available shipping rates for a checkout.
   *
   * `GET /checkouts/{checkoutId}/shipping_rates`
   *
   * @param checkoutId - The Recharge checkout token.
   * @returns The available shipping rates.
   */
  getShippingRates(checkoutId: string): Promise<CheckoutShippingRatesResponse> {
    return this._get(
      `${this.url}/${checkoutId}/shipping_rates`,
      undefined,
      CheckoutShippingRatesResponse
    );
  }

  /**
   * Process (complete) a checkout.
   *
   * `POST /checkouts/{checkoutId}/process`
   *
   * @param checkoutId - The Recharge checkout token.
   * @param body - Optional payload for processing the checkout (e.g. payment details).
   * @returns The processed checkout result.
   */
  process(
    checkoutId: string,
    body?: CheckoutProcessBody
  ): Promise<CheckoutProcessResponse> {
    return this._post(
      `${this.url}/${checkoutId}/process`,
      body,
      CheckoutProcessResponse
    );
  }
}

export { CheckoutResource };
