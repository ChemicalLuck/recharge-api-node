import type RechargeClient from "../../client";
import { RechargeAPIVersion } from "../../models";
import RechargeResource from "../resource";

class NotificationResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "notifications";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  send(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }
}

export { NotificationResource };
