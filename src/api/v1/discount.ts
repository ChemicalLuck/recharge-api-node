import RechargeClient from "../../client";
import { RechargeAPIVersion } from "../../models";
import RechargeResource from "../resource";

class DiscountResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "discounts";
    this.recharge_version = RechargeAPIVersion.v1;
  }
}

export { DiscountResource };
