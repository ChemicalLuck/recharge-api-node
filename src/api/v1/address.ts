import RechargeResource from "../resource";
import type RechargeClient from "~/client";

class AddressResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "addresses";
  }

  create(customerId: number, body: object): Promise<unknown> {
    return this._post(
      `${this.baseUrl}/customers/${customerId}/addresses`,
      body
    );
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

  list(customerId: number, query?: Record<string, string>): Promise<unknown> {
    return this._paginate(
      `${this.baseUrl}/customers/${customerId}/addresses`,
      "addresses",
      query
    );
  }

  count(query?: Record<string, string>): Promise<unknown> {
    return this._get(`${this.url}/count`, query);
  }

  validate(body: unknown): Promise<unknown> {
    return this._post(`${this.url}/validate`, body);
  }

  applyDiscount(addressId: number, body: unknown): Promise<unknown> {
    return this._post(`${this.url}/${addressId}/discounts`, body);
  }
}

export { AddressResource };
