import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  Webhook,
  WebhookResponse,
  type WebhookListParams,
  type WebhookCreateBody,
  type WebhookUpdateBody,
  type WebhookTestBody
} from "~/models/api/v2/webhook";
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
  create(body: WebhookCreateBody): Promise<WebhookResponse> {
    return this._post(this.url, body, WebhookResponse);
  }

  /**
   * Retrieve a single webhook.
   *
   * `GET /webhooks/{webhookId}`
   *
   * @param webhookId - The Recharge webhook ID.
   * @returns The webhook record.
   */
  get(webhookId: number): Promise<WebhookResponse> {
    return this._get(`${this.url}/${webhookId}`, undefined, WebhookResponse);
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
  update(webhookId: number, body: WebhookUpdateBody): Promise<WebhookResponse> {
    return this._put(`${this.url}/${webhookId}`, body, WebhookResponse);
  }

  /**
   * Delete a webhook.
   *
   * `DELETE /webhooks/{webhookId}`
   *
   * @param webhookId - The Recharge webhook ID.
   * @returns The API response for the deletion.
   */
  delete(webhookId: number): Promise<undefined> {
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
  list(query?: WebhookListParams): Promise<Webhook[]> {
    return this._paginate(
      this.url,
      "webhooks",
      query as Record<string, string> | undefined,
      Webhook
    );
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
  test(webhookId: number, body?: WebhookTestBody): Promise<WebhookResponse> {
    return this._post(`${this.url}/${webhookId}/test`, body, WebhookResponse);
  }
}

export { WebhookResource };
