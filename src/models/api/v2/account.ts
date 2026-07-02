import { z } from "zod";

/**
 * A Recharge account (2021-11).
 *
 * Only the `get` and `list` endpoints are modeled.
 *
 * @see https://developer.rechargepayments.com/2021-11/accounts/account_object
 */
export const Account = z.looseObject({
  id: z.number().nullable().optional(),
  user_id: z.number().nullable().optional(),
  is_owner: z.boolean().nullable().optional(),
  invited_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional()
});
export type Account = z.infer<typeof Account>;

/** Envelope returned by single-account endpoints. */
export const AccountResponse = z.object({ account: Account });
export type AccountResponse = z.infer<typeof AccountResponse>;

/** Query parameters accepted by `GET /accounts`. */
export const AccountListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  status: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional()
});
export type AccountListParams = z.infer<typeof AccountListParams>;
