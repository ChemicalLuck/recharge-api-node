import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  Product,
  ProductResponse,
  type ProductListParams,
  type ProductCreateBody,
  type ProductUpdateBody
} from "~/models/api/v2/product";
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
  create(body: ProductCreateBody): Promise<ProductResponse> {
    return this._post(`${this.url}`, body, ProductResponse);
  }

  /**
   * Retrieve a single product.
   *
   * `GET /products/{productId}`
   *
   * @param productId - The Recharge product ID.
   * @returns The product record.
   */
  get(productId: number): Promise<ProductResponse> {
    return this._get(`${this.url}/${productId}`, undefined, ProductResponse);
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
  update(productId: number, body: ProductUpdateBody): Promise<ProductResponse> {
    return this._put(`${this.url}/${productId}`, body, ProductResponse);
  }

  /**
   * Delete a product.
   *
   * `DELETE /products/{productId}`
   *
   * @param productId - The Recharge product ID.
   * @returns Nothing on success.
   */
  delete(productId: number): Promise<undefined> {
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
  list(query?: ProductListParams): Promise<Product[]> {
    return this._paginate(
      `${this.url}`,
      "products",
      query as Record<string, string> | undefined,
      Product
    );
  }
}

export { ProductResource };
