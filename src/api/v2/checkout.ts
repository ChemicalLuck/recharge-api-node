import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
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
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Retrieve a single checkout.
   *
   * `GET /checkouts/{checkoutId}`
   *
   * @param checkoutId - The Recharge checkout token.
   * @returns The checkout record.
   */
  get(checkoutId: string): Promise<unknown> {
    return this._get(`${this.url}/${checkoutId}`);
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
  update(checkoutId: string, body: object): Promise<unknown> {
    return this._put(`${this.url}/${checkoutId}`, body);
  }

  /**
   * Retrieve the available shipping rates for a checkout.
   *
   * `GET /checkouts/{checkoutId}/shipping_rates`
   *
   * @param checkoutId - The Recharge checkout token.
   * @returns The available shipping rates.
   */
  getShippingRates(checkoutId: string): Promise<unknown> {
    return this._get(`${this.url}/${checkoutId}/shipping_rates`);
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
  process(checkoutId: string, body?: object): Promise<unknown> {
    return this._post(`${this.url}/${checkoutId}/process`, body);
  }
}

export { CheckoutResource };
