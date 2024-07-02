import RechargeClient from "../../client";
import { RechargeAPIVersion } from "../../models";
import RechargeResource from "../resource";

class MetafieldResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "metafields";
    this.recharge_version = RechargeAPIVersion.v1;
  }
}

export { MetafieldResource };
