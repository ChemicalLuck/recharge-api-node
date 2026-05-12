import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class CustomerResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "customers";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  get(customerId: number): Promise<unknown> {
    return this._get(`${this.url}/${customerId}`);
  }

  update(customerId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${customerId}`, body);
  }

  delete(customerId: number): Promise<unknown> {
    return this._delete(`${this.url}/${customerId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "customers", query);
  }

  deliverySchedule(customerId: number): Promise<unknown> {
    return this._get(`${this.url}/${customerId}/delivery_schedule`);
  }

  creditSummary(customerId: number): Promise<unknown> {
    return this._get(`${this.url}/${customerId}/credit_summary`);
  }
}

export { CustomerResource };
