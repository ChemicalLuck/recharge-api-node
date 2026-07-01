import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage orders on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/orders
 */
class OrderResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "orders";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Retrieve a single order.
   *
   * `GET /orders/{orderId}`
   *
   * @param orderId - The Recharge order ID.
   * @returns The order record.
   */
  get(orderId: number): Promise<unknown> {
    return this._get(`${this.url}/${orderId}`);
  }

  /**
   * Update an existing order.
   *
   * `PUT /orders/{orderId}`
   *
   * @param orderId - The Recharge order ID.
   * @param body - The fields to update.
   * @returns The updated order record.
   */
  update(orderId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${orderId}`, body);
  }

  /**
   * Delete an order.
   *
   * `DELETE /orders/{orderId}`
   *
   * @param orderId - The Recharge order ID.
   * @returns The API response for the deletion.
   */
  delete(orderId: number): Promise<unknown> {
    return this._delete(`${this.url}/${orderId}`);
  }

  /**
   * List orders, paginating through all results.
   *
   * `GET /orders`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of order records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "orders", query);
  }

  /**
   * Clone an existing order.
   *
   * `POST /orders/{orderId}/clone`
   *
   * @param orderId - The Recharge order ID.
   * @param body - Optional payload for the clone request.
   * @returns The cloned order record.
   */
  clone(orderId: number, body?: object): Promise<unknown> {
    return this._post(`${this.url}/${orderId}/clone`, body);
  }

  /**
   * Delay an order.
   *
   * `POST /orders/{orderId}/delay`
   *
   * @param orderId - The Recharge order ID.
   * @param body - Optional payload describing the delay.
   * @returns The updated order record.
   */
  delay(orderId: number, body?: object): Promise<unknown> {
    return this._post(`${this.url}/${orderId}/delay`, body);
  }
}

export { OrderResource };
