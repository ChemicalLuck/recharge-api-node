import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage webhooks on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/webhooks
 */
class WebhookResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "webhooks";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Create a new webhook.
   *
   * `POST /webhooks`
   *
   * @param body - The webhook payload.
   * @returns The created webhook record.
   */
  create(body: object): Promise<unknown> {
    return this._post(this.url, body);
  }

  /**
   * Retrieve a single webhook.
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
   * Update an existing webhook.
   *
   * `PUT /webhooks/{webhookId}`
   *
   * @param webhookId - The Recharge webhook ID.
   * @param body - The fields to update.
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
   * List webhooks, paginating through all results.
   *
   * `GET /webhooks`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of webhook records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(this.url, "webhooks", query);
  }

  /**
   * Send a test event to a webhook.
   *
   * `POST /webhooks/{webhookId}/test`
   *
   * @param webhookId - The Recharge webhook ID.
   * @param body - Optional payload for the test request.
   * @returns The API response for the test.
   */
  test(webhookId: number, body?: object): Promise<unknown> {
    return this._post(`${this.url}/${webhookId}/test`, body);
  }
}

export { WebhookResource };
