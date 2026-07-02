import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  Order,
  OrderResponse,
  OrderCountResponse,
  type OrderListParams,
  type OrderUpdateBody,
  type OrderChangeDateBody,
  type OrderChangeVariantBody,
  type OrderCloneBody
} from "~/models/api/v1/order";
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
  get(orderId: number): Promise<OrderResponse> {
    return this._get(`${this.url}/${orderId}`, undefined, OrderResponse);
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
  update(orderId: number, body: OrderUpdateBody): Promise<OrderResponse> {
    return this._put(`${this.url}/${orderId}`, body, OrderResponse);
  }

  /**
   * Delete an order.
   *
   * `DELETE /orders/{orderId}`
   *
   * @param orderId - The Recharge order ID.
   * @returns The API response for the deletion.
   */
  delete(orderId: number): Promise<undefined> {
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
  list(query?: OrderListParams): Promise<Order[]> {
    return this._paginate(
      `${this.url}`,
      "orders",
      query as Record<string, string> | undefined,
      Order
    );
  }

  /**
   * Count orders.
   *
   * `GET /orders/count`
   *
   * @param query - Optional query parameters for filtering the count.
   * @returns The order count.
   */
  count(query?: OrderListParams): Promise<OrderCountResponse> {
    return this._get(
      `${this.url}/count`,
      query as Record<string, string> | undefined,
      OrderCountResponse
    );
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
  change_date(
    orderId: number,
    body: OrderChangeDateBody
  ): Promise<OrderResponse> {
    return this._post(
      `${this.url}/${orderId}/change_date`,
      body,
      OrderResponse
    );
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
  change_variant(
    orderId: number,
    body: OrderChangeVariantBody
  ): Promise<OrderResponse> {
    return this._put(
      `${this.url}/${orderId}/change_variant`,
      body,
      OrderResponse
    );
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
  clone(orderId: number, body?: OrderCloneBody): Promise<OrderResponse> {
    return this._post(`${this.url}/${orderId}/clone`, body, OrderResponse);
  }

  /**
   * Delay an order.
   *
   * `POST /orders/{orderId}/delay`
   *
   * @param orderId - The Recharge order ID.
   * @returns The updated order record.
   */
  delay(orderId: number): Promise<OrderResponse> {
    return this._post(`${this.url}/${orderId}/delay`, undefined, OrderResponse);
  }
}

export { OrderResource };
