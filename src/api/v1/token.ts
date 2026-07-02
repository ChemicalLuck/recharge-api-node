import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import { TokenInformationResponse } from "~/models/api/v1/token";
import RechargeResource from "../resource";

/**
 * Retrieve API token information on the Recharge 2021-01 API.
 *
 * @see https://developer.rechargepayments.com/2021-01/token_information
 */
class TokenResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "token_information";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  /**
   * Retrieve information about the current API token.
   *
   * `GET /token_information`
   *
   * @returns The token information record.
   */
  token_information(): Promise<TokenInformationResponse> {
    return this._get(this.url, undefined, TokenInformationResponse);
  }
}

export { TokenResource };
