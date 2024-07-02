import RechargeClient from "../../client";
import { RechargeAPIVersion } from "../../models";
import RechargeResource from "../resource";

class AddressResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "addresses";
    this.recharge_version = RechargeAPIVersion.v1;
  }

  create(customer_id: number, body: object): Promise<any> {
    return this.client.post(
      `${this.base_url}/customers/${customer_id}/${this.resource}`,
      body
    );
  }

  get(address_id: number): Promise<any> {
    return this.client.get(`${this.url}/${address_id}`);
  }

  update(address_id: number, body: object): Promise<any> {
    return this.client.put(`${this.url}/${address_id}`, body);
  }

  delete(address_id: number): Promise<any> {
    return this.client.delete(`${this.url}/${address_id}`);
  }

  list(customer_id: number, query?: Record<string, any>): Promise<any> {
    return this.client.get(
      `${this.base_url}/customers/${customer_id}/${this.resource}`,
      query
    );
  }

  count(query?: Record<string, any>): Promise<any> {
    return this.client.get(`${this.url}/count`, query);
  }

  validate(body: any): Promise<any> {
    return this.client.post(`${this.url}/validate`, body);
  }

  applyDiscount(address_id: number, body: Record<string, any>): Promise<any> {
    return this.client.post(`${this.url}/${address_id}/apply_discount`, body);
  }

  removeDiscount(address_id: number): Promise<any> {
    return this.client.post(`${this.url}/${address_id}/remove_discount`);
  }
}

export { AddressResource };
