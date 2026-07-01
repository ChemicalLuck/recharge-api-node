import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Read store information on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/store
 */
class StoreResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "store";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Retrieve the store record.
   *
   * `GET /store`
   *
   * @returns The store record.
   */
  get(): Promise<unknown> {
    return this._get(`${this.url}`);
  }
}

export { StoreResource };
