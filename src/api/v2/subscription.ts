import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  Subscription,
  SubscriptionResponse,
  type SubscriptionListParams,
  type SubscriptionCreate,
  type SubscriptionUpdate,
  type SubscriptionSetNextChargeDate,
  type SubscriptionChangeAddress,
  type SubscriptionCancel,
  type SubscriptionGift
} from "~/models/api/v2/subscription";
import RechargeResource from "../resource";

/**
 * Manage subscriptions on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/subscriptions
 */
class SubscriptionResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "subscriptions";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Create a new subscription.
   *
   * `POST /subscriptions`
   *
   * @param body - The subscription payload.
   * @returns The created subscription record.
   */
  create(body: SubscriptionCreate): Promise<SubscriptionResponse> {
    return this._post(`${this.url}`, body, SubscriptionResponse);
  }

  /**
   * Retrieve a single subscription.
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
   * Update an existing subscription.
   *
   * `PUT /subscriptions/{subscriptionId}`
   *
   * @param subscriptionId - The Recharge subscription ID.
   * @param body - The fields to update.
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
   * List subscriptions, paginating through all results.
   *
   * `GET /subscriptions`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of subscription records.
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
   * Set the next charge date for a subscription.
   *
   * `POST /subscriptions/{subscriptionId}/set_next_charge_date`
   *
   * @param subscriptionId - The Recharge subscription ID.
   * @param body - The payload containing the new next charge date.
   * @returns The updated subscription record.
   */
  setNextChargeDate(
    subscriptionId: number,
    body: SubscriptionSetNextChargeDate
  ): Promise<SubscriptionResponse> {
    return this._post(
      `${this.url}/${subscriptionId}/set_next_charge_date`,
      body,
      SubscriptionResponse
    );
  }

  /**
   * Change the address associated with a subscription.
   *
   * `POST /subscriptions/{subscriptionId}/change_address`
   *
   * @param subscriptionId - The Recharge subscription ID.
   * @param body - The payload describing the new address.
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
   * @param body - Optional payload describing the cancellation (e.g. reason).
   * @returns The updated subscription record.
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
   * @returns The updated subscription record.
   */
  activate(subscriptionId: number): Promise<SubscriptionResponse> {
    return this._post(
      `${this.url}/${subscriptionId}/activate`,
      undefined,
      SubscriptionResponse
    );
  }

  /**
   * Gift a subscription.
   *
   * `POST /subscriptions/{subscriptionId}/gift`
   *
   * @param subscriptionId - The Recharge subscription ID.
   * @param body - The payload describing the gift.
   * @returns The updated subscription record.
   */
  gift(
    subscriptionId: number,
    body: SubscriptionGift
  ): Promise<SubscriptionResponse> {
    return this._post(
      `${this.url}/${subscriptionId}/gift`,
      body,
      SubscriptionResponse
    );
  }
}

export { SubscriptionResource };
