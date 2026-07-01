import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage charges (upcoming and historical) on the Recharge 2021-01 API.
 *
 * @see https://developer.rechargepayments.com/2021-01/charges
 */
class ChargeResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "charges";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  /**
   * Retrieve a charge.
   *
   * `GET /charges/{chargeId}`
   *
   * @param chargeId - The Recharge charge ID.
   * @returns The charge record.
   */
  get(chargeId: number): Promise<unknown> {
    return this._get(`${this.url}/${chargeId}`);
  }

  /**
   * List charges.
   *
   * `GET /charges`
   *
   * @param query - Optional query parameters for filtering and pagination.
   * @returns The paginated list of charge records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "charges", query);
  }

  /**
   * Count charges.
   *
   * `GET /charges/count`
   *
   * @param query - Optional query parameters for filtering the count.
   * @returns The charge count.
   */
  count(query?: Record<string, string>): Promise<unknown> {
    return this._get(`${this.url}/count`, query);
  }

  /**
   * Change the next charge date of a charge.
   *
   * `POST /charges/{chargeId}/change_next_charge_date`
   *
   * @param chargeId - The Recharge charge ID.
   * @param body - The new charge date attributes.
   * @returns The updated charge record.
   */
  change_next_charge_date(chargeId: number, body: object): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/change_next_charge_date`, body);
  }

  /**
   * Skip a charge.
   *
   * `POST /charges/{chargeId}/skip`
   *
   * @param chargeId - The Recharge charge ID.
   * @param body - Optional attributes describing what to skip.
   * @returns The updated charge record.
   */
  skip(chargeId: number, body?: object): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/skip`, body);
  }

  /**
   * Unskip a previously skipped charge.
   *
   * `POST /charges/{chargeId}/unskip`
   *
   * @param chargeId - The Recharge charge ID.
   * @param body - Optional attributes describing what to unskip.
   * @returns The updated charge record.
   */
  unskip(chargeId: number, body?: object): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/unskip`, body);
  }

  /**
   * Refund a charge.
   *
   * `POST /charges/{chargeId}/refund`
   *
   * @param chargeId - The Recharge charge ID.
   * @param body - Optional refund attributes such as amount.
   * @returns The refunded charge record.
   */
  refund(chargeId: number, body?: object): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/refund`, body);
  }

  /**
   * Process a charge immediately.
   *
   * `POST /charges/{chargeId}/process`
   *
   * @param chargeId - The Recharge charge ID.
   * @returns The processed charge record.
   */
  process(chargeId: number): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/process`);
  }

  /**
   * Capture payment for a charge.
   *
   * `POST /charges/{chargeId}/capture_payment`
   *
   * @param chargeId - The Recharge charge ID.
   * @returns The captured charge record.
   */
  capture(chargeId: number): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/capture_payment`);
  }

  /**
   * Apply a discount to a charge.
   *
   * `POST /charges/{chargeId}/apply_discount`
   *
   * @param chargeId - The Recharge charge ID.
   * @param body - The discount to apply.
   * @returns The updated charge record.
   */
  apply_discount(chargeId: number, body: object): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/apply_discount`, body);
  }

  /**
   * Remove the discount from a charge.
   *
   * `POST /charges/{chargeId}/remove_discount`
   *
   * @param chargeId - The Recharge charge ID.
   * @returns The updated charge record.
   */
  remove_discount(chargeId: number): Promise<unknown> {
    return this._post(`${this.url}/${chargeId}/remove_discount`);
  }
}

export { ChargeResource };
