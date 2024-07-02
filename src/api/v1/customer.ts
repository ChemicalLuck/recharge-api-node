import RechargeClient from "../../client";
import { RechargeAPIVersion } from "../../models";
import RechargeResource from "../resource";

class CustomerResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "customers";
    this.recharge_version = RechargeAPIVersion.v1;
  }
}

export { CustomerResource };
