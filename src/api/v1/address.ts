/* Pending implementation */
/* eslint-disable @typescript-eslint/no-explicit-any */

import RechargeResource from "../resource";
import RechargeClient from "../../client";

class AddressResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "addresses";
  }

  create(customerId: number, body: object): Promise<any> {
    return this.client.post(
      `${this.base_url}/customers/${customerId}/${this.resource}`,
      this.recharge_version,
      body
    );
  }

  get(addressId: number): Promise<any> {
    return this._get(`${this.url}/${addressId}`);
  }

  update(addressId: number, body: object): Promise<any> {
    return this._put(`${this.url}/${addressId}`, body);
  }

  delete(addressId: number): Promise<any> {
    return this._delete(`${this.url}/${addressId}`);
  }

  list(customerId: number, query?: Record<string, string>): Promise<any> {
    return this._get(
      `${this.base_url}/customers/${customerId}/${this.resource}`,
      query
    );
  }

  count(query?: Record<string, string>): Promise<any> {
    return this._get(`${this.url}/count`, query);
  }

  validate(body: unknown): Promise<any> {
    return this._post(`${this.url}/validate`, body);
  }

  applyDiscount(addressId: number, body: unknown): Promise<any> {
    return this._post(`${this.url}/${addressId}/apply_discount`, body);
  }

  removeDiscount(addressId: number): Promise<any> {
    return this._post(`${this.url}/${addressId}/remove_discount`);
  }
}

export { AddressResource };
