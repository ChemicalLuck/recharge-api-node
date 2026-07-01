import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Send customer notifications on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/notifications
 */
class NotificationResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "notifications";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Send an email notification.
   *
   * `POST /notifications`
   *
   * @param body - The notification payload describing the email to send.
   * @returns The API response for the notification.
   */
  sendEmail(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }
}

export { NotificationResource };
