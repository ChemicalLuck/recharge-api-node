import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  CreditAccount,
  CreditAccountResponse,
  CreditAdjustment,
  CreditAdjustmentResponse,
  type CreditAccountListParams,
  type CreditAdjustmentListParams,
  type CreditAccountCreateBody,
  type CreditAccountUpdateBody,
  type CreditAdjustmentCreateBody
} from "~/models/api/v2/credit";
import RechargeResource from "../resource";

/**
 * Manage credit accounts and their adjustments on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/credit_accounts
 */
class CreditResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "credit_accounts";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Create a new credit account.
   *
   * `POST /credit_accounts`
   *
   * @param body - The credit account payload.
   * @returns The created credit account record.
   */
  create(body: CreditAccountCreateBody): Promise<CreditAccountResponse> {
    return this._post(`${this.url}`, body, CreditAccountResponse);
  }

  /**
   * Retrieve a single credit account.
   *
   * `GET /credit_accounts/{creditAccountId}`
   *
   * @param creditAccountId - The Recharge credit account ID.
   * @returns The credit account record.
   */
  get(creditAccountId: number): Promise<CreditAccountResponse> {
    return this._get(
      `${this.url}/${creditAccountId}`,
      undefined,
      CreditAccountResponse
    );
  }

  /**
   * Update an existing credit account.
   *
   * `PUT /credit_accounts/{creditAccountId}`
   *
   * @param creditAccountId - The Recharge credit account ID.
   * @param body - The fields to update.
   * @returns The updated credit account record.
   */
  update(
    creditAccountId: number,
    body: CreditAccountUpdateBody
  ): Promise<CreditAccountResponse> {
    return this._put(
      `${this.url}/${creditAccountId}`,
      body,
      CreditAccountResponse
    );
  }

  /**
   * List credit accounts, paginating through all results.
   *
   * `GET /credit_accounts`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of credit account records.
   */
  list(query?: CreditAccountListParams): Promise<CreditAccount[]> {
    return this._paginate(
      `${this.url}`,
      "credit_accounts",
      query as Record<string, string> | undefined,
      CreditAccount
    );
  }

  /**
   * Create a credit adjustment on a credit account.
   *
   * `POST /credit_accounts/{creditAccountId}/credit_adjustments`
   *
   * @param creditAccountId - The Recharge credit account ID.
   * @param body - The credit adjustment payload.
   * @returns The created credit adjustment record.
   */
  createAdjustment(
    creditAccountId: number,
    body: CreditAdjustmentCreateBody
  ): Promise<CreditAdjustmentResponse> {
    return this._post(
      `${this.url}/${creditAccountId}/credit_adjustments`,
      body,
      CreditAdjustmentResponse
    );
  }

  /**
   * List the credit adjustments for a specific credit account, paginating through all results.
   *
   * `GET /credit_accounts/{creditAccountId}/credit_adjustments`
   *
   * @param creditAccountId - The Recharge credit account ID.
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of credit adjustment records for the account.
   */
  listAdjustments(
    creditAccountId: number,
    query?: CreditAdjustmentListParams
  ): Promise<CreditAdjustment[]> {
    return this._paginate(
      `${this.url}/${creditAccountId}/credit_adjustments`,
      "credit_adjustments",
      query as Record<string, string> | undefined,
      CreditAdjustment
    );
  }

  /**
   * List credit adjustments across all credit accounts, paginating through all results.
   *
   * Uses the API base URL rather than the credit account resource path.
   *
   * `GET /credit_adjustments`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of credit adjustment records.
   */
  listAllAdjustments(
    query?: CreditAdjustmentListParams
  ): Promise<CreditAdjustment[]> {
    return this._paginate(
      `${this.baseUrl}/credit_adjustments`,
      "credit_adjustments",
      query as Record<string, string> | undefined,
      CreditAdjustment
    );
  }
}

export { CreditResource };
