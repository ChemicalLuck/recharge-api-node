import RechargeClient from "../../client";
import { RechargeAPIVersion } from "../../models";
import RechargeResource from "../resource";

class AsyncBatchResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "async_batch";
    this.recharge_version = RechargeAPIVersion.v1;
  }
}

export { AsyncBatchResource };
