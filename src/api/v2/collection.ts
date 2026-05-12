import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class CollectionResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "collections";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  get(collectionId: number): Promise<unknown> {
    return this._get(`${this.url}/${collectionId}`);
  }

  update(collectionId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${collectionId}`, body);
  }

  delete(collectionId: number): Promise<unknown> {
    return this._delete(`${this.url}/${collectionId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "collections", query);
  }

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

  addProducts(collectionId: number, body: object): Promise<unknown> {
    return this._post(`${this.url}/${collectionId}/products`, body);
  }

  removeProducts(collectionId: number, body: object): Promise<unknown> {
    return this._delete(`${this.url}/${collectionId}/products`, body);
  }
}

export { CollectionResource };
