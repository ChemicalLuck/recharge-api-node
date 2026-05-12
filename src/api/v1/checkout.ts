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

  get(token: string): Promise<unknown> {
    return this._get(`${this.url}/${token}`);
  }

  update(token: string, body: object): Promise<unknown> {
    return this._put(`${this.url}/${token}`, body);
  }

  get_shipping_rates(token: string): Promise<unknown> {
    return this._get(`${this.url}/${token}/shipping_rates`);
  }

  process(token: string, body?: object): Promise<unknown> {
    return this._post(`${this.url}/${token}/charge`, body);
  }
}

export { CheckoutResource };
