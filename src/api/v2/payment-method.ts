import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage payment methods on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/payment_methods
 */
class PaymentMethodResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "payment_methods";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Create a new payment method.
   *
   * `POST /payment_methods`
   *
   * @param body - The payment method payload.
   * @returns The created payment method record.
   */
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Retrieve a single payment method.
   *
   * `GET /payment_methods/{paymentMethodId}`
   *
   * @param paymentMethodId - The Recharge payment method ID.
   * @returns The payment method record.
   */
  get(paymentMethodId: number): Promise<unknown> {
    return this._get(`${this.url}/${paymentMethodId}`);
  }

  /**
   * Update an existing payment method.
   *
   * `PUT /payment_methods/{paymentMethodId}`
   *
   * @param paymentMethodId - The Recharge payment method ID.
   * @param body - The fields to update.
   * @returns The updated payment method record.
   */
  update(paymentMethodId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${paymentMethodId}`, body);
  }

  /**
   * Delete a payment method.
   *
   * `DELETE /payment_methods/{paymentMethodId}`
   *
   * @param paymentMethodId - The Recharge payment method ID.
   * @returns The API response for the deletion.
   */
  delete(paymentMethodId: number): Promise<unknown> {
    return this._delete(`${this.url}/${paymentMethodId}`);
  }

  /**
   * List payment methods, paginating through all results.
   *
   * `GET /payment_methods`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of payment method records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "payment_methods", query);
  }
}

export { PaymentMethodResource };
