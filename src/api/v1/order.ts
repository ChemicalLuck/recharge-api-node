import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage orders on the Recharge 2021-01 API.
 *
 * @see https://developer.rechargepayments.com/2021-01/orders
 */
class OrderResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "orders";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  /**
   * Retrieve an order.
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
   * Update an order.
   *
   * `PUT /orders/{orderId}`
   *
   * @param orderId - The Recharge order ID.
   * @param body - The order attributes to update.
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
   * List orders.
   *
   * `GET /orders`
   *
   * @param query - Optional query parameters for filtering and pagination.
   * @returns The paginated list of order records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "orders", query);
  }

  /**
   * Count orders.
   *
   * `GET /orders/count`
   *
   * @param query - Optional query parameters for filtering the count.
   * @returns The order count.
   */
  count(query?: Record<string, string>): Promise<unknown> {
    return this._get(`${this.url}/count`, query);
  }

  /**
   * Change the scheduled date of an order.
   *
   * `POST /orders/{orderId}/change_date`
   *
   * @param orderId - The Recharge order ID.
   * @param body - The new date attributes.
   * @returns The updated order record.
   */
  change_date(orderId: number, body: object): Promise<unknown> {
    return this._post(`${this.url}/${orderId}/change_date`, body);
  }

  /**
   * Change the product variant on an order.
   *
   * `PUT /orders/{orderId}/change_variant`
   *
   * @param orderId - The Recharge order ID.
   * @param body - The new variant attributes.
   * @returns The updated order record.
   */
  change_variant(orderId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${orderId}/change_variant`, body);
  }

  /**
   * Clone an order.
   *
   * `POST /orders/{orderId}/clone`
   *
   * @param orderId - The Recharge order ID.
   * @param body - Optional attributes for the cloned order.
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
   * @returns The updated order record.
   */
  delay(orderId: number): Promise<unknown> {
    return this._post(`${this.url}/${orderId}/delay`);
  }
}

export { OrderResource };
