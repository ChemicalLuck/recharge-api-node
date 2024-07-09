export const RechargeAPIVersion = {
  v1: "2021-01",
  v2: "2021-11"
} as const;

export type RechargeAPIVersion =
  (typeof RechargeAPIVersion)[keyof typeof RechargeAPIVersion];
