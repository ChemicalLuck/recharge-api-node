import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class EntitlementResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "entitlements";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  update(entitlementId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${entitlementId}`, body);
  }

  delete(entitlementId: number): Promise<unknown> {
    return this._delete(`${this.url}/${entitlementId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "entitlements", query);
  }
}

export { EntitlementResource };
