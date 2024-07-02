import RechargeClient from "../../client";
import { RechargeAPIVersion } from "../../models";
import RechargeResource from "../resource";

class TokenResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "token_information";
    this.recharge_version = RechargeAPIVersion.v1;
  }
}

export { TokenResource };
