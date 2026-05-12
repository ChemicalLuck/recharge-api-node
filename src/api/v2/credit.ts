import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class CreditResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "credit_accounts";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  get(creditAccountId: number): Promise<unknown> {
    return this._get(`${this.url}/${creditAccountId}`);
  }

  update(creditAccountId: number, body: object): Promise<unknown> {
    return this._put(`${this.url}/${creditAccountId}`, body);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "credit_accounts", query);
  }

  createAdjustment(creditAccountId: number, body: object): Promise<unknown> {
    return this._post(
      `${this.url}/${creditAccountId}/credit_adjustments`,
      body
    );
  }

  listAdjustments(
    creditAccountId: number,
    query?: Record<string, string>
  ): Promise<unknown> {
    return this._paginate(
      `${this.url}/${creditAccountId}/credit_adjustments`,
      "credit_adjustments",
      query
    );
  }

  listAllAdjustments(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(
      `${this.baseUrl}/credit_adjustments`,
      "credit_adjustments",
      query
    );
  }
}

export { CreditResource };
