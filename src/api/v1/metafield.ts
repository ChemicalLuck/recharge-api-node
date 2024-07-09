import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class MetafieldResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "metafields";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  get(metafieldId: number): Promise<unknown> {
    return this._get(`${this.url}/${metafieldId}`);
  }

  update(metafieldId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${metafieldId}`, body);
  }

  delete(metafieldId: number): Promise<unknown> {
    return this._delete(`${this.url}/${metafieldId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, query);
  }

  count(query?: Record<string, string>): Promise<unknown> {
    return this._get(`${this.url}/count`, query);
  }
}

export { MetafieldResource };
