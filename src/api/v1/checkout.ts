import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  CheckoutResponse,
  CheckoutShippingRatesResponse,
  CheckoutChargeResponse,
  type CheckoutCreateBody,
  type CheckoutUpdateBody,
  type CheckoutChargeBody
} from "~/models/api/v1/checkout";
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
  create(body: CheckoutCreateBody): Promise<CheckoutResponse> {
    return this._post(`${this.url}`, body, CheckoutResponse);
  }

  /**
   * Retrieve a checkout by token.
   *
   * `GET /checkouts/{token}`
   *
   * @param token - The checkout token.
   * @returns The checkout record.
   */
  get(token: string): Promise<CheckoutResponse> {
    return this._get(`${this.url}/${token}`, undefined, CheckoutResponse);
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
  update(token: string, body: CheckoutUpdateBody): Promise<CheckoutResponse> {
    return this._put(`${this.url}/${token}`, body, CheckoutResponse);
  }

  /**
   * Retrieve the available shipping rates for a checkout.
   *
   * `GET /checkouts/{token}/shipping_rates`
   *
   * @param token - The checkout token.
   * @returns The available shipping rates.
   */
  get_shipping_rates(token: string): Promise<CheckoutShippingRatesResponse> {
    return this._get(
      `${this.url}/${token}/shipping_rates`,
      undefined,
      CheckoutShippingRatesResponse
    );
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
  process(
    token: string,
    body?: CheckoutChargeBody
  ): Promise<CheckoutChargeResponse> {
    return this._post(
      `${this.url}/${token}/charge`,
      body,
      CheckoutChargeResponse
    );
  }
}

export { CheckoutResource };
