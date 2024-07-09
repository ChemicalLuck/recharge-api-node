import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class WebhookResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "webhooks";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  create(body: object): Promise<unknown> {
    return this._post(this.url, body);
  }

  get(webhookId: number): Promise<unknown> {
    return this._get(`${this.url}/${webhookId}`);
  }

  update(webhookId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${webhookId}`, body);
  }

  delete(webhookId: number): Promise<unknown> {
    return this._delete(`${this.url}/${webhookId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(this.url, query);
  }

  test(webhookId: number): Promise<unknown> {
    return this._post(`${this.url}/${webhookId}/test`, {});
  }
}

export { WebhookResource };
