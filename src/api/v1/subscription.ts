import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage subscriptions on the Recharge 2021-01 API.
 *
 * @see https://developer.rechargepayments.com/2021-01/subscriptions
 */
class SubscriptionResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "subscriptions";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  /**
   * Create a subscription.
   *
   * `POST /subscriptions`
   *
   * @param body - The subscription attributes to create.
   * @returns The created subscription record.
   */
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Retrieve a subscription.
   *
   * `GET /subscriptions/{subscriptionId}`
   *
   * @param subscriptionId - The Recharge subscription ID.
   * @returns The subscription record.
   */
  get(subscriptionId: number): Promise<unknown> {
    return this._get(`${this.url}/${subscriptionId}`);
  }

  /**
   * Update a subscription.
   *
   * `PUT /subscriptions/{subscriptionId}`
   *
   * @param subscriptionId - The Recharge subscription ID.
   * @param body - The subscription attributes to update.
   * @returns The updated subscription record.
   */
  update(subscriptionId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${subscriptionId}`, body);
  }

  /**
   * Delete a subscription.
   *
   * `DELETE /subscriptions/{subscriptionId}`
   *
   * @param subscriptionId - The Recharge subscription ID.
   * @returns The API response for the deletion.
   */
  delete(subscriptionId: number): Promise<unknown> {
    return this._delete(`${this.url}/${subscriptionId}`);
  }

  /**
   * List subscriptions.
   *
   * `GET /subscriptions`
   *
   * @param query - Optional query parameters for filtering and pagination.
   * @returns The paginated list of subscription records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "subscriptions", query);
  }

  /**
   * Count subscriptions.
   *
   * `GET /subscriptions/count`
   *
   * @param query - Optional query parameters for filtering the count.
   * @returns The subscription count.
   */
  count(query?: Record<string, string>): Promise<unknown> {
    return this._get(`${this.url}/count`, query);
  }

  /**
   * Change the next charge date of a subscription.
   *
   * `POST /subscriptions/{subscriptionId}/change_next_charge_date`
   *
   * @param subscriptionId - The Recharge subscription ID.
   * @param body - The new charge date attributes.
   * @returns The updated subscription record.
   */
  changeNextChargeDate(subscriptionId: number, body: object): Promise<unknown> {
    return this._post(
      `${this.url}/${subscriptionId}/change_next_charge_date`,
      body
    );
  }

  /**
   * Change the address a subscription ships to.
   *
   * `POST /subscriptions/{subscriptionId}/change_address`
   *
   * @param subscriptionId - The Recharge subscription ID.
   * @param body - The new address attributes.
   * @returns The updated subscription record.
   */
  changeAddress(subscriptionId: number, body: object): Promise<unknown> {
    return this._post(`${this.url}/${subscriptionId}/change_address`, body);
  }

  /**
   * Cancel a subscription.
   *
   * `POST /subscriptions/{subscriptionId}/cancel`
   *
   * @param subscriptionId - The Recharge subscription ID.
   * @param body - Optional cancellation attributes such as reason.
   * @returns The cancelled subscription record.
   */
  cancel(subscriptionId: number, body?: object): Promise<unknown> {
    return this._post(`${this.url}/${subscriptionId}/cancel`, body);
  }

  /**
   * Activate a cancelled subscription.
   *
   * `POST /subscriptions/{subscriptionId}/activate`
   *
   * @param subscriptionId - The Recharge subscription ID.
   * @returns The activated subscription record.
   */
  activate(subscriptionId: number): Promise<unknown> {
    return this._post(`${this.url}/${subscriptionId}/activate`);
  }

  /**
   * Create multiple subscriptions in bulk.
   *
   * `POST /subscriptions/bulk_create`
   *
   * @param body - The subscriptions to create.
   * @returns The created subscription records.
   */
  bulkCreate(body: object): Promise<unknown> {
    return this._post(`${this.url}/bulk_create`, body);
  }

  /**
   * Update multiple subscriptions in bulk.
   *
   * `PUT /subscriptions/bulk_update`
   *
   * @param body - The subscriptions to update.
   * @returns The updated subscription records.
   */
  bulkUpdate(body: object): Promise<unknown> {
    return this._put(`${this.url}/bulk_update`, body);
  }

  /**
   * Delete multiple subscriptions in bulk.
   *
   * `DELETE /subscriptions/bulk_delete`
   *
   * @param body - The subscriptions to delete.
   * @returns The API response for the bulk deletion.
   */
  bulkDelete(body: object): Promise<unknown> {
    return this._delete(`${this.url}/bulk_delete`, body);
  }
}

export { SubscriptionResource };
