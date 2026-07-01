import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Access Recharge accounts on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/accounts
 */
class AccountResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "accounts";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Retrieve a single account.
   *
   * `GET /accounts/{accountId}`
   *
   * @param accountId - The Recharge account ID.
   * @returns The account record.
   */
  get(accountId: number): Promise<unknown> {
    return this._get(`${this.url}/${accountId}`);
  }

  /**
   * List accounts, paginating through all results.
   *
   * `GET /accounts`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of account records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "accounts", query);
  }
}

export { AccountResource };
