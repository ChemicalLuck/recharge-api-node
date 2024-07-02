import RechargeClient from "../../client";
import { RechargeAPIVersion } from "../../models";
import RechargeResource from "../resource";

class ProductResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "products";
    this.recharge_version = RechargeAPIVersion.v1;
  }
}

export { ProductResource };
