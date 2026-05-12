import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class ChargeResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "charges";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  get(chargeId: number): Promise<unknown> {
    return this._get(`${this.url}/${chargeId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "charges", query);
  }

  applyDiscount(chargeId: number, body: object): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/apply_discount`, body);
  }

  removeDiscount(chargeId: number): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/remove_discount`);
  }

  skip(chargeId: number, body?: object): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/skip`, body);
  }

  unskip(chargeId: number, body?: object): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/unskip`, body);
  }

  refund(chargeId: number, body?: object): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/refund`, body);
  }

  process(chargeId: number): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/process`);
  }

  capture(chargeId: number): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/capture_payment`);
  }

  addFreeGift(chargeId: number, body: object): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/add_free_gift`, body);
  }

  removeFreeGift(chargeId: number, body: object): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/remove_free_gift`, body);
  }
}

export { ChargeResource };
