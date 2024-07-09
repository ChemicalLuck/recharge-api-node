import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class CheckoutResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "checkouts";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  get(checkoutId: number): Promise<unknown> {
    return this._get(`${this.url}/${checkoutId}`);
  }

  update(checkoutId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${checkoutId}`, body);
  }

  get_shipping_rates(checkoutId: number): Promise<unknown> {
    return this._get(`${this.url}/${checkoutId}/shipping_rates`);
  }

  process(checkoutId: number): Promise<unknown> {
    return this._post(`${this.url}/${checkoutId}/process`);
  }
}

export { CheckoutResource };
