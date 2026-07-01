/**
 * Supported Recharge API versions, sent via the `X-Recharge-Version` header.
 *
 * - `v1` → `2021-01` (Link-header pagination)
 * - `v2` → `2021-11` (cursor pagination)
 */
export const RechargeAPIVersion = {
  v1: "2021-01",
  v2: "2021-11"
} as const;

export type RechargeAPIVersion =
  (typeof RechargeAPIVersion)[keyof typeof RechargeAPIVersion];
