import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class StoreResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "store";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  get(): Promise<unknown> {
    return this._get(`${this.url}`);
  }
}

export { StoreResource };
