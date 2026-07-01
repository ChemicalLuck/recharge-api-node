import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage collections and their products on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/collections
 */
class CollectionResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "collections";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Create a new collection.
   *
   * `POST /collections`
   *
   * @param body - The collection payload.
   * @returns The created collection record.
   */
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Retrieve a single collection.
   *
   * `GET /collections/{collectionId}`
   *
   * @param collectionId - The Recharge collection ID.
   * @returns The collection record.
   */
  get(collectionId: number): Promise<unknown> {
    return this._get(`${this.url}/${collectionId}`);
  }

  /**
   * Update an existing collection.
   *
   * `PUT /collections/{collectionId}`
   *
   * @param collectionId - The Recharge collection ID.
   * @param body - The fields to update.
   * @returns The updated collection record.
   */
  update(collectionId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${collectionId}`, body);
  }

  /**
   * Delete a collection.
   *
   * `DELETE /collections/{collectionId}`
   *
   * @param collectionId - The Recharge collection ID.
   * @returns The API response for the deletion.
   */
  delete(collectionId: number): Promise<unknown> {
    return this._delete(`${this.url}/${collectionId}`);
  }

  /**
   * List collections, paginating through all results.
   *
   * `GET /collections`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of collection records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "collections", query);
  }

  /**
   * List the products belonging to a collection, paginating through all results.
   *
   * `GET /collections/{collectionId}/products`
   *
   * @param collectionId - The Recharge collection ID.
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of product records in the collection.
   */
  listProducts(
    collectionId: number,
    query?: Record<string, string>
  ): Promise<unknown> {
    return this._paginate(
      `${this.url}/${collectionId}/products`,
      "products",
      query
    );
  }

  /**
   * Add products to a collection.
   *
   * `POST /collections/{collectionId}/products`
   *
   * @param collectionId - The Recharge collection ID.
   * @param body - The payload listing the products to add.
   * @returns The API response for the add request.
   */
  addProducts(collectionId: number, body: object): Promise<unknown> {
    return this._post(`${this.url}/${collectionId}/products`, body);
  }

  /**
   * Remove products from a collection.
   *
   * `DELETE /collections/{collectionId}/products`
   *
   * @param collectionId - The Recharge collection ID.
   * @param body - The payload listing the products to remove.
   * @returns The API response for the remove request.
   */
  removeProducts(collectionId: number, body: object): Promise<unknown> {
    return this._delete(`${this.url}/${collectionId}/products`, body);
  }
}

export { CollectionResource };
