import RechargeClient from "../../client";
import { RechargeAPIVersion } from "../../models";
import RechargeResource from "../resource";

class WebhookResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "webhooks";
    this.recharge_version = RechargeAPIVersion.v1;
  }
}

export { WebhookResource };
