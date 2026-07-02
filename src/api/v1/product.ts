import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  Product,
  ProductResponse,
  type ProductListParams,
  type ProductCountParams,
  type ProductCreateBody,
  type ProductUpdateBody
} from "~/models/api/v1/product";
import RechargeResource from "../resource";

/**
 * Manage products on the Recharge 2021-01 API.
 *
 * @see https://developer.rechargepayments.com/2021-01/products
 */
class ProductResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "products";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  /**
   * Create a product.
   *
   * `POST /products`
   *
   * @param body - The product attributes to create.
   * @returns The created product record.
   */
  create(body: ProductCreateBody): Promise<ProductResponse> {
    return this._post(`${this.url}`, body, ProductResponse);
  }

  /**
   * Retrieve a product.
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
   * Update a product.
   *
   * `PUT /products/{productId}`
   *
   * @param productId - The Recharge product ID.
   * @param body - The product attributes to update.
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
   * List products.
   *
   * `GET /products`
   *
   * @param query - Optional query parameters for filtering and pagination.
   * @returns The paginated list of product records.
   */
  list(query?: ProductListParams): Promise<Product[]> {
    return this._paginate(
      `${this.url}`,
      "products",
      query as Record<string, string> | undefined,
      Product
    );
  }

  /**
   * Count products.
   *
   * `GET /products/count`
   *
   * @param query - Optional query parameters for filtering the count.
   * @returns The product count.
   */
  count(query?: ProductCountParams): Promise<{ count: number }> {
    return this._get(
      `${this.url}/count`,
      query as Record<string, string> | undefined
    );
  }
}

export { ProductResource };
