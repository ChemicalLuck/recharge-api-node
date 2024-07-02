import RechargeClient from "../../client";
import { RechargeAPIVersion } from "../../models";
import RechargeResource from "../resource";

class ShopResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "shop";
    this.recharge_version = RechargeAPIVersion.v1;
  }
}

export { ShopResource };
