import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage checkouts on the Recharge 2021-01 API.
 *
 * @see https://developer.rechargepayments.com/2021-01/checkouts
 */
class CheckoutResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "checkouts";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  /**
   * Create a checkout.
   *
   * `POST /checkouts`
   *
   * @param body - The checkout attributes to create.
   * @returns The created checkout record.
   */
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Retrieve a checkout by token.
   *
   * `GET /checkouts/{token}`
   *
   * @param token - The checkout token.
   * @returns The checkout record.
   */
  get(token: string): Promise<unknown> {
    return this._get(`${this.url}/${token}`);
  }

  /**
   * Update a checkout by token.
   *
   * `PUT /checkouts/{token}`
   *
   * @param token - The checkout token.
   * @param body - The checkout attributes to update.
   * @returns The updated checkout record.
   */
  update(token: string, body: object): Promise<unknown> {
    return this._put(`${this.url}/${token}`, body);
  }

  /**
   * Retrieve the available shipping rates for a checkout.
   *
   * `GET /checkouts/{token}/shipping_rates`
   *
   * @param token - The checkout token.
   * @returns The available shipping rates.
   */
  get_shipping_rates(token: string): Promise<unknown> {
    return this._get(`${this.url}/${token}/shipping_rates`);
  }

  /**
   * Process (charge) a checkout.
   *
   * `POST /checkouts/{token}/charge`
   *
   * @param token - The checkout token.
   * @param body - Optional charge attributes such as the payment token.
   * @returns The resulting charge record.
   */
  process(token: string, body?: object): Promise<unknown> {
    return this._post(`${this.url}/${token}/charge`, body);
  }
}

export { CheckoutResource };
