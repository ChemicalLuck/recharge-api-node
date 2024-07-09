/* Pending implementation */
/* eslint-disable @typescript-eslint/no-explicit-any */

import RechargeResource from "../resource";
import type RechargeClient from "~/client";

class AddressResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "addresses";
  }

  create(customerId: number, body: object): Promise<any> {
    return this._post(
      `${this.baseUrl}/customers/${customerId}/${this.resource}`,
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
    return this._paginate(
      `${this.baseUrl}/customers/${customerId}/${this.resource}`,
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
