import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class BundleSelectionResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "bundle_selections";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  get(bundleSelectionId: number): Promise<unknown> {
    return this._get(`${this.url}/${bundleSelectionId}`);
  }

  update(bundleSelectionId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${bundleSelectionId}`, body);
  }

  delete(bundleSelectionId: number): Promise<unknown> {
    return this._delete(`${this.url}/${bundleSelectionId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "bundle_selections", query);
  }
}

export { BundleSelectionResource };
