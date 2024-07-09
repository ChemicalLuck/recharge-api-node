import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class ChargeResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "charges";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  create(charge: object): Promise<unknown> {
    return this._post(`${this.url}`, charge);
  }

  get(chargeId: number): Promise<unknown> {
    return this._get(`${this.url}/${chargeId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, query);
  }

  count(query?: Record<string, string>): Promise<unknown> {
    return this._get(`${this.url}/count`, query);
  }

  change_next_charge_date(chargeId: number, body: object): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/change_next_charge_date`, body);
  }

  skip(chargeId: number): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/skip`);
  }

  unskip(chargeId: number): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/unskip`);
  }

  refund(chargeId: number): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/refund`);
  }

  process(chargeId: number): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/process`);
  }

  capture(chargeId: number): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/capture_payment`);
  }

  apply_discount(chargeId: number, body: object): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/apply_discount`, body);
  }

  remove_discount(chargeId: number): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/remove_discount`);
  }
}

export { ChargeResource };
