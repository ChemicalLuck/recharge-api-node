import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class OrderResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "orders";
    this.rechargeVersion = RechargeAPIVersion.v1;
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
    return this._paginate(`${this.url}`, query);
  }

  count(query?: Record<string, string>): Promise<unknown> {
    return this._get(`${this.url}/count`, query);
  }

  change_date(orderId: number, body: object): Promise<unknown> {
    return this._post(`${this.url}/${orderId}/change_order_date`, body);
  }

  change_variant(
    orderId: number,
    oldVariantId: number,
    body: object
  ): Promise<unknown> {
    return this._put(
      `${this.url}/${orderId}/update_shopify_variant/${oldVariantId}`,
      body
    );
  }

  clone(orderId: number, chargeId: number, body: object): Promise<unknown> {
    return this._post(
      `${this.url}/clone_order_on_success_charge/${orderId}/charge/${chargeId}`,
      body
    );
  }

  delay(orderId: number): Promise<unknown> {
    return this._post(`${this.url}/${orderId}/delay`);
  }
}

export { OrderResource };
