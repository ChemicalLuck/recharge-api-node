import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Retrieve shop information on the Recharge 2021-01 API.
 *
 * @see https://developer.rechargepayments.com/2021-01/shop
 */
class ShopResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "shop";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  /**
   * Retrieve the shop.
   *
   * `GET /shop`
   *
   * @returns The shop record.
   */
  get(): Promise<unknown> {
    return this._get(`${this.url}`);
  }

  /**
   * Retrieve the shop's shipping countries.
   *
   * `GET /shop/shipping_countries`
   *
   * @returns The list of shipping countries.
   */
  shipping_countries(): Promise<unknown> {
    return this._get(`${this.url}/shipping_countries`);
  }
}

export { ShopResource };
