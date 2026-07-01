import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage webhooks on the Recharge 2021-01 API.
 *
 * @see https://developer.rechargepayments.com/2021-01/webhooks
 */
class WebhookResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "webhooks";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  /**
   * Create a webhook.
   *
   * `POST /webhooks`
   *
   * @param body - The webhook attributes to create.
   * @returns The created webhook record.
   */
  create(body: object): Promise<unknown> {
    return this._post(this.url, body);
  }

  /**
   * Retrieve a webhook.
   *
   * `GET /webhooks/{webhookId}`
   *
   * @param webhookId - The Recharge webhook ID.
   * @returns The webhook record.
   */
  get(webhookId: number): Promise<unknown> {
    return this._get(`${this.url}/${webhookId}`);
  }

  /**
   * Update a webhook.
   *
   * `PUT /webhooks/{webhookId}`
   *
   * @param webhookId - The Recharge webhook ID.
   * @param body - The webhook attributes to update.
   * @returns The updated webhook record.
   */
  update(webhookId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${webhookId}`, body);
  }

  /**
   * Delete a webhook.
   *
   * `DELETE /webhooks/{webhookId}`
   *
   * @param webhookId - The Recharge webhook ID.
   * @returns The API response for the deletion.
   */
  delete(webhookId: number): Promise<unknown> {
    return this._delete(`${this.url}/${webhookId}`);
  }

  /**
   * List webhooks.
   *
   * `GET /webhooks`
   *
   * @param query - Optional query parameters for filtering and pagination.
   * @returns The paginated list of webhook records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(this.url, "webhooks", query);
  }

  /**
   * Send a test event for a webhook.
   *
   * `POST /webhooks/test`
   *
   * @param body - Optional attributes describing the test event.
   * @returns The API response for the test request.
   */
  test(body?: object): Promise<unknown> {
    return this._post(`${this.url}/test`, body);
  }
}

export { WebhookResource };
