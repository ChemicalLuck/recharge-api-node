import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Send customer notifications on the Recharge 2021-01 API.
 *
 * @see https://developer.rechargepayments.com/2021-01/notifications
 */
class NotificationResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "notifications";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  /**
   * Send a notification.
   *
   * `POST /notifications`
   *
   * @param body - The notification attributes to send.
   * @returns The API response for the sent notification.
   */
  send(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }
}

export { NotificationResource };
