import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  Charge,
  ChargeResponse,
  type ChargeListParams,
  type ChargeApplyDiscountBody,
  type ChargeSkipBody,
  type ChargeRefundBody,
  type ChargeFreeGiftBody
} from "~/models/api/v2/charge";
import RechargeResource from "../resource";

/**
 * Manage charges on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/charges
 */
class ChargeResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "charges";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Retrieve a single charge.
   *
   * `GET /charges/{chargeId}`
   *
   * @param chargeId - The Recharge charge ID.
   * @returns The charge record.
   */
  get(chargeId: number): Promise<ChargeResponse> {
    return this._get(`${this.url}/${chargeId}`, undefined, ChargeResponse);
  }

  /**
   * List charges, paginating through all results.
   *
   * `GET /charges`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of charge records.
   */
  list(query?: ChargeListParams): Promise<Charge[]> {
    return this._paginate(
      `${this.url}`,
      "charges",
      query as Record<string, string> | undefined,
      Charge
    );
  }

  /**
   * Apply a discount to a charge.
   *
   * `POST /charges/{chargeId}/apply_discount`
   *
   * @param chargeId - The Recharge charge ID.
   * @param body - The payload describing the discount to apply.
   * @returns The updated charge record.
   */
  applyDiscount(
    chargeId: number,
    body: ChargeApplyDiscountBody
  ): Promise<ChargeResponse> {
    return this._post(
      `${this.url}/${chargeId}/apply_discount`,
      body,
      ChargeResponse
    );
  }

  /**
   * Remove the discount from a charge.
   *
   * `POST /charges/{chargeId}/remove_discount`
   *
   * @param chargeId - The Recharge charge ID.
   * @returns The updated charge record.
   */
  removeDiscount(chargeId: number): Promise<ChargeResponse> {
    return this._post(
      `${this.url}/${chargeId}/remove_discount`,
      undefined,
      ChargeResponse
    );
  }

  /**
   * Skip a charge.
   *
   * `POST /charges/{chargeId}/skip`
   *
   * @param chargeId - The Recharge charge ID.
   * @param body - Optional payload for the skip request.
   * @returns The updated charge record.
   */
  skip(chargeId: number, body?: ChargeSkipBody): Promise<ChargeResponse> {
    return this._post(`${this.url}/${chargeId}/skip`, body, ChargeResponse);
  }

  /**
   * Unskip a previously skipped charge.
   *
   * `POST /charges/{chargeId}/unskip`
   *
   * @param chargeId - The Recharge charge ID.
   * @param body - Optional payload for the unskip request.
   * @returns The updated charge record.
   */
  unskip(chargeId: number, body?: ChargeSkipBody): Promise<ChargeResponse> {
    return this._post(`${this.url}/${chargeId}/unskip`, body, ChargeResponse);
  }

  /**
   * Refund a charge.
   *
   * `POST /charges/{chargeId}/refund`
   *
   * @param chargeId - The Recharge charge ID.
   * @param body - Optional payload describing the refund (e.g. amount).
   * @returns The updated charge record.
   */
  refund(chargeId: number, body?: ChargeRefundBody): Promise<ChargeResponse> {
    return this._post(`${this.url}/${chargeId}/refund`, body, ChargeResponse);
  }

  /**
   * Process a charge.
   *
   * `POST /charges/{chargeId}/process`
   *
   * @param chargeId - The Recharge charge ID.
   * @returns The updated charge record.
   */
  process(chargeId: number): Promise<ChargeResponse> {
    return this._post(
      `${this.url}/${chargeId}/process`,
      undefined,
      ChargeResponse
    );
  }

  /**
   * Capture payment for a charge.
   *
   * `POST /charges/{chargeId}/capture_payment`
   *
   * @param chargeId - The Recharge charge ID.
   * @returns The updated charge record.
   */
  capture(chargeId: number): Promise<ChargeResponse> {
    return this._post(
      `${this.url}/${chargeId}/capture_payment`,
      undefined,
      ChargeResponse
    );
  }

  /**
   * Add a free gift to a charge.
   *
   * `POST /charges/{chargeId}/add_free_gift`
   *
   * @param chargeId - The Recharge charge ID.
   * @param body - The payload describing the free gift to add.
   * @returns The updated charge record.
   */
  addFreeGift(
    chargeId: number,
    body: ChargeFreeGiftBody
  ): Promise<ChargeResponse> {
    return this._post(
      `${this.url}/${chargeId}/add_free_gift`,
      body,
      ChargeResponse
    );
  }

  /**
   * Remove a free gift from a charge.
   *
   * `POST /charges/{chargeId}/remove_free_gift`
   *
   * @param chargeId - The Recharge charge ID.
   * @param body - The payload describing the free gift to remove.
   * @returns The updated charge record.
   */
  removeFreeGift(
    chargeId: number,
    body: ChargeFreeGiftBody
  ): Promise<ChargeResponse> {
    return this._post(
      `${this.url}/${chargeId}/remove_free_gift`,
      body,
      ChargeResponse
    );
  }
}

export { ChargeResource };
