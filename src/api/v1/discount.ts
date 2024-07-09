import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class DiscountResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "discounts";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  get(discountId: number): Promise<unknown> {
    return this._get(`${this.url}/${discountId}`);
  }

  update(discountId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${discountId}`, body);
  }

  delete(discountId: number): Promise<unknown> {
    return this._delete(`${this.url}/${discountId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, query);
  }

  count(query?: Record<string, string>): Promise<unknown> {
    return this._get(`${this.url}/count`, query);
  }
}

export { DiscountResource };
