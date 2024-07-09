import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class ShopResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "shop";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  get(): Promise<unknown> {
    return this._get(`${this.url}`);
  }

  shipping_countries(): Promise<unknown> {
    return this._get(`${this.url}/shipping_countries`);
  }
}

export { ShopResource };
