import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class OrderResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "orders";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  get(orderId: number): Promise<unknown> {
    return this._get(`${this.url}/${orderId}`);
  }

  update(orderId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${orderId}`, body);
  }

  delete(orderId: number): Promise<unknown> {
    return this._delete(`${this.url}/${orderId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "orders", query);
  }

  clone(orderId: number, body?: object): Promise<unknown> {
    return this._post(`${this.url}/${orderId}/clone`, body);
  }

  delay(orderId: number, body?: object): Promise<unknown> {
    return this._post(`${this.url}/${orderId}/delay`, body);
  }
}

export { OrderResource };
