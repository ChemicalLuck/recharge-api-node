import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Read information about the current API token on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/token_information
 */
class TokenResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "token_information";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Retrieve information about the API token in use.
   *
   * `GET /token_information`
   *
   * @returns The token information record.
   */
  get(): Promise<unknown> {
    return this._get(this.url);
  }
}

export { TokenResource };
