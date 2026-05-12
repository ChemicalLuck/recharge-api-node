import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class SubscriptionResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "subscriptions";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  get(subscriptionId: number): Promise<unknown> {
    return this._get(`${this.url}/${subscriptionId}`);
  }

  update(subscriptionId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${subscriptionId}`, body);
  }

  delete(subscriptionId: number): Promise<unknown> {
    return this._delete(`${this.url}/${subscriptionId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "subscriptions", query);
  }

  setNextChargeDate(subscriptionId: number, body: object): Promise<unknown> {
    return this._post(
      `${this.url}/${subscriptionId}/set_next_charge_date`,
      body
    );
  }

  changeAddress(subscriptionId: number, body: object): Promise<unknown> {
    return this._post(`${this.url}/${subscriptionId}/change_address`, body);
  }

  cancel(subscriptionId: number, body?: object): Promise<unknown> {
    return this._post(`${this.url}/${subscriptionId}/cancel`, body);
  }

  activate(subscriptionId: number): Promise<unknown> {
    return this._post(`${this.url}/${subscriptionId}/activate`);
  }
}

export { SubscriptionResource };
