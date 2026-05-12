import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class AddressResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "addresses";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  get(addressId: number): Promise<unknown> {
    return this._get(`${this.url}/${addressId}`);
  }

  update(addressId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${addressId}`, body);
  }

  delete(addressId: number): Promise<unknown> {
    return this._delete(`${this.url}/${addressId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "addresses", query);
  }

  merge(body: object): Promise<unknown> {
    return this._post(`${this.url}/merge`, body);
  }

  skipFutureCharge(addressId: number, body: object): Promise<unknown> {
    return this._post(`${this.url}/${addressId}/charges/skip`, body);
  }
}

export { AddressResource };
