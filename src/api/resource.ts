import RechargeClient from "../client";
import { RechargeAPIVersion } from "../models";

abstract class RechargeResource {
  protected base_url: string;
  protected resource: string | null;
  protected recharge_version: RechargeAPIVersion;
  protected client: RechargeClient;

  protected constructor(client: RechargeClient) {
    this.base_url = "https://api.rechargeapps.com";
    this.resource = null;
    this.recharge_version = RechargeAPIVersion.v1;
    this.client = client;
  }

  protected get url(): string {
    return `${this.base_url}/${this.recharge_version}/${this.resource}`;
  }
}

export default RechargeResource;
