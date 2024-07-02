import RechargeClient from "../../client";
import { RechargeAPIVersion } from "../../models";
import RechargeResource from "../resource";

class OnetimeResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "onetimes";
    this.recharge_version = RechargeAPIVersion.v1;
  }
}

export { OnetimeResource };
