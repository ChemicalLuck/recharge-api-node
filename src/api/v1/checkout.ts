import RechargeClient from "../../client";
import { RechargeAPIVersion } from "../../models";
import RechargeResource from "../resource";

class CheckoutResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "checkouts";
    this.recharge_version = RechargeAPIVersion.v1;
  }
}

export { CheckoutResource };
