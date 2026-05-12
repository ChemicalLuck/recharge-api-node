import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class PlanResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "plans";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  update(planId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${planId}`, body);
  }

  delete(planId: number): Promise<unknown> {
    return this._delete(`${this.url}/${planId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "plans", query);
  }

  bulkCreate(body: object): Promise<unknown> {
    return this._post(`${this.url}/bulk`, body);
  }

  bulkUpdate(body: object): Promise<unknown> {
    return this._put(`${this.url}/bulk`, body);
  }

  bulkDelete(body: object): Promise<unknown> {
    return this._delete(`${this.url}/bulk`, body);
  }
}

export { PlanResource };
