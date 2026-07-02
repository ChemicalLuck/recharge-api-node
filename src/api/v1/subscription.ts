import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  Subscription,
  SubscriptionResponse,
  SubscriptionsResponse,
  SubscriptionCountResponse,
  type SubscriptionListParams,
  type SubscriptionCreate,
  type SubscriptionUpdate,
  type SubscriptionChangeNextChargeDate,
  type SubscriptionChangeAddress,
  type SubscriptionCancel,
  type SubscriptionBulkCreate,
  type SubscriptionBulkUpdate,
  type SubscriptionBulkDelete
} from "~/models/api/v1/subscription";
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
  create(body: SubscriptionCreate): Promise<SubscriptionResponse> {
    return this._post(`${this.url}`, body, SubscriptionResponse);
  }

  /**
   * Retrieve a subscription.
   *
   * `GET /subscriptions/{subscriptionId}`
   *
   * @param subscriptionId - The Recharge subscription ID.
   * @returns The subscription record.
   */
  get(subscriptionId: number): Promise<SubscriptionResponse> {
    return this._get(
      `${this.url}/${subscriptionId}`,
      undefined,
      SubscriptionResponse
    );
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
  update(
    subscriptionId: number,
    body: SubscriptionUpdate
  ): Promise<SubscriptionResponse> {
    return this._put(
      `${this.url}/${subscriptionId}`,
      body,
      SubscriptionResponse
    );
  }

  /**
   * Delete a subscription.
   *
   * `DELETE /subscriptions/{subscriptionId}`
   *
   * @param subscriptionId - The Recharge subscription ID.
   * @returns The API response for the deletion.
   */
  delete(subscriptionId: number): Promise<undefined> {
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
  list(query?: SubscriptionListParams): Promise<Subscription[]> {
    return this._paginate(
      `${this.url}`,
      "subscriptions",
      query as Record<string, string> | undefined,
      Subscription
    );
  }

  /**
   * Count subscriptions.
   *
   * `GET /subscriptions/count`
   *
   * @param query - Optional query parameters for filtering the count.
   * @returns The subscription count.
   */
  count(query?: SubscriptionListParams): Promise<SubscriptionCountResponse> {
    return this._get(
      `${this.url}/count`,
      query as Record<string, string> | undefined,
      SubscriptionCountResponse
    );
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
  changeNextChargeDate(
    subscriptionId: number,
    body: SubscriptionChangeNextChargeDate
  ): Promise<SubscriptionResponse> {
    return this._post(
      `${this.url}/${subscriptionId}/change_next_charge_date`,
      body,
      SubscriptionResponse
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
  changeAddress(
    subscriptionId: number,
    body: SubscriptionChangeAddress
  ): Promise<SubscriptionResponse> {
    return this._post(
      `${this.url}/${subscriptionId}/change_address`,
      body,
      SubscriptionResponse
    );
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
  cancel(
    subscriptionId: number,
    body?: SubscriptionCancel
  ): Promise<SubscriptionResponse> {
    return this._post(
      `${this.url}/${subscriptionId}/cancel`,
      body,
      SubscriptionResponse
    );
  }

  /**
   * Activate a cancelled subscription.
   *
   * `POST /subscriptions/{subscriptionId}/activate`
   *
   * @param subscriptionId - The Recharge subscription ID.
   * @returns The activated subscription record.
   */
  activate(subscriptionId: number): Promise<SubscriptionResponse> {
    return this._post(
      `${this.url}/${subscriptionId}/activate`,
      undefined,
      SubscriptionResponse
    );
  }

  /**
   * Create multiple subscriptions in bulk.
   *
   * `POST /subscriptions/bulk_create`
   *
   * @param body - The subscriptions to create.
   * @returns The created subscription records.
   */
  bulkCreate(body: SubscriptionBulkCreate): Promise<SubscriptionsResponse> {
    return this._post(`${this.url}/bulk_create`, body, SubscriptionsResponse);
  }

  /**
   * Update multiple subscriptions in bulk.
   *
   * `PUT /subscriptions/bulk_update`
   *
   * @param body - The subscriptions to update.
   * @returns The updated subscription records.
   */
  bulkUpdate(body: SubscriptionBulkUpdate): Promise<SubscriptionsResponse> {
    return this._put(`${this.url}/bulk_update`, body, SubscriptionsResponse);
  }

  /**
   * Delete multiple subscriptions in bulk.
   *
   * `DELETE /subscriptions/bulk_delete`
   *
   * @param body - The subscriptions to delete.
   * @returns The API response for the bulk deletion.
   */
  bulkDelete(body: SubscriptionBulkDelete): Promise<SubscriptionsResponse> {
    return this._delete(`${this.url}/bulk_delete`, body, SubscriptionsResponse);
  }
}

export { SubscriptionResource };
