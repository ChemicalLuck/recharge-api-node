export {
  HTTPResponseError,
  RechargeAPIError,
  NotImplementedError
} from "./error";

export { RechargeAPIVersion } from "./api/version";

export { RequestMethod } from "./request";

/** Shared leaf sub-schemas used across resources and both API versions. */
export * from "./api/common";

/**
 * Zod schemas and inferred types for the 2021-01 (v1) API resources.
 * Namespaced because v1 and v2 define entities of the same name (e.g. `Charge`).
 *
 * @example
 * ```typescript
 * import { v1Models } from "@chemicalluck/recharge-api-node";
 * type V1Charge = v1Models.Charge;
 * ```
 */
export * as v1Models from "./api/v1";

/**
 * Zod schemas and inferred types for the 2021-11 (v2) API resources.
 *
 * @example
 * ```typescript
 * import { v2Models } from "@chemicalluck/recharge-api-node";
 * type V2Charge = v2Models.Charge;
 * ```
 */
export * as v2Models from "./api/v2";
