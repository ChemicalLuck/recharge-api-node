import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class CheckoutResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "checkouts";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  get(checkoutId: string): Promise<unknown> {
    return this._get(`${this.url}/${checkoutId}`);
  }

  update(checkoutId: string, body: object): Promise<unknown> {
    return this._put(`${this.url}/${checkoutId}`, body);
  }

  getShippingRates(checkoutId: string): Promise<unknown> {
    return this._get(`${this.url}/${checkoutId}/shipping_rates`);
  }

  process(checkoutId: string, body?: object): Promise<unknown> {
    return this._post(`${this.url}/${checkoutId}/process`, body);
  }
}

export { CheckoutResource };
