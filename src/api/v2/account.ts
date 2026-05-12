import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class AccountResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "accounts";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  get(accountId: number): Promise<unknown> {
    return this._get(`${this.url}/${accountId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "accounts", query);
  }
}

export { AccountResource };
