import { z } from "zod";

/**
 * Information about the API token in use (2021-01).
 *
 * Returned by `GET /token_information`. The endpoint reports the token's
 * granted scopes together with the store/client it is bound to. The documented
 * shape is loosely specified, so unknown keys are preserved.
 *
 * @see https://developer.rechargepayments.com/2021-01/token_information
 */
export const TokenInformation = z.looseObject({
  name: z.string().nullable().optional(),
  contact_email: z.string().nullable().optional(),
  scopes: z.array(z.string()).nullable().optional(),
  client: z
    .looseObject({
      contact_email: z.string().nullable().optional(),
      name: z.string().nullable().optional()
    })
    .nullable()
    .optional()
});
export type TokenInformation = z.infer<typeof TokenInformation>;

/**
 * Best-effort response returned by `GET /token_information`.
 *
 * Recharge returns the token/store details either at the top level or under a
 * `token_information` key depending on context, so this envelope stays loose.
 */
export const TokenInformationResponse = z.looseObject({
  token_information: TokenInformation.nullable().optional()
});
export type TokenInformationResponse = z.infer<typeof TokenInformationResponse>;
