import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class EventResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "events";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "events", query);
  }
}

export { EventResource };
