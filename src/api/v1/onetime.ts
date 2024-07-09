import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class OnetimeResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "onetimes";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  get(onetimeId: number): Promise<unknown> {
    return this._get(`${this.url}/${onetimeId}`);
  }

  update(onetimeId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${onetimeId}`, body);
  }

  delete(onetimeId: number): Promise<unknown> {
    return this._delete(`${this.url}/${onetimeId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, query);
  }
}

export { OnetimeResource };
