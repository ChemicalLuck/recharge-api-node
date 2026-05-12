import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class PaymentMethodResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "payment_methods";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  get(paymentMethodId: number): Promise<unknown> {
    return this._get(`${this.url}/${paymentMethodId}`);
  }

  update(paymentMethodId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${paymentMethodId}`, body);
  }

  delete(paymentMethodId: number): Promise<unknown> {
    return this._delete(`${this.url}/${paymentMethodId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "payment_methods", query);
  }
}

export { PaymentMethodResource };
