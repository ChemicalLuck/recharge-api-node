import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage products on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/products
 */
class ProductResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "products";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Create a new product.
   *
   * `POST /products`
   *
   * @param body - The product payload.
   * @returns The created product record.
   */
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Retrieve a single product.
   *
   * `GET /products/{productId}`
   *
   * @param productId - The Recharge product ID.
   * @returns The product record.
   */
  get(productId: number): Promise<unknown> {
    return this._get(`${this.url}/${productId}`);
  }

  /**
   * Update an existing product.
   *
   * `PUT /products/{productId}`
   *
   * @param productId - The Recharge product ID.
   * @param body - The fields to update.
   * @returns The updated product record.
   */
  update(productId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${productId}`, body);
  }

  /**
   * Delete a product.
   *
   * `DELETE /products/{productId}`
   *
   * @param productId - The Recharge product ID.
   * @returns The API response for the deletion.
   */
  delete(productId: number): Promise<unknown> {
    return this._delete(`${this.url}/${productId}`);
  }

  /**
   * List products, paginating through all results.
   *
   * `GET /products`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of product records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "products", query);
  }
}

export { ProductResource };
