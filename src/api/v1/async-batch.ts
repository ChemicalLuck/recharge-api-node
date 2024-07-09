import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class AsyncBatchResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "async_batch";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }
}

export { AsyncBatchResource };
