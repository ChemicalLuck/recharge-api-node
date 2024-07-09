import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class ProductResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "products";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  get(productId: number): Promise<unknown> {
    return this._get(`${this.url}/${productId}`);
  }

  update(productId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${productId}`, body);
  }

  delete(productId: number): Promise<unknown> {
    return this._delete(`${this.url}/${productId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, query);
  }

  count(query?: Record<string, string>): Promise<unknown> {
    return this._get(`${this.url}/count`, query);
  }
}

export { ProductResource };
