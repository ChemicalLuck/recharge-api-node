import RechargeClient from "../../client";
import { RechargeAPIVersion } from "../../models";
import RechargeResource from "../resource";

class NotificationResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "notifications";
    this.recharge_version = RechargeAPIVersion.v1;
  }
}

export { NotificationResource };
