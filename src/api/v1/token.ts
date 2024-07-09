import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class TokenResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "token_information";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  token_information(): Promise<unknown> {
    return this._get(this.url);
  }
}

export { TokenResource };
