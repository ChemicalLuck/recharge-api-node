import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Read events on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/events
 */
class EventResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "events";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * List events, paginating through all results.
   *
   * `GET /events`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of event records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "events", query);
  }
}

export { EventResource };
