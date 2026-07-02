import type { z } from "zod";

/**
 * Details passed to an {@link OnValidationError} handler when a response body
 * fails schema validation.
 */
export interface ValidationErrorInfo {
  /** Human-readable location of the failure (e.g. `"GET /charges/{id}"`). */
  context?: string;
  /** The Zod issues describing why validation failed. */
  issues: z.ZodError["issues"];
  /** The raw parsed data that failed validation. */
  raw: unknown;
}

/**
 * Callback invoked when a response body fails runtime validation.
 *
 * Validation is a non-throwing safety net: after this handler runs, the client
 * still returns the raw (unvalidated) data to the caller. Use it to log, report,
 * or sample schema drift.
 */
export type OnValidationError = (info: ValidationErrorInfo) => void;

/**
 * Default validation-error handler: logs a warning to the console.
 */
export const defaultOnValidationError: OnValidationError = ({
  context,
  issues
}) => {
  console.warn(
    `[recharge-api-node] Response validation failed${
      context ? ` for ${context}` : ""
    }:`,
    issues
  );
};

/**
 * Validate parsed data against a schema without ever throwing.
 *
 * On success the parsed (and, for loose object schemas, unknown-key-preserving)
 * data is returned. On failure the `onError` handler is invoked and the raw data
 * is returned unchanged, cast to the expected type — schema drift never breaks a
 * caller. When no schema is supplied the raw data is passed straight through,
 * which keeps untyped endpoints working during gradual adoption.
 *
 * @typeParam T - The inferred output type of the schema.
 * @param raw - The parsed JSON to validate.
 * @param schema - The Zod schema to validate against, or `undefined` to skip.
 * @param onError - Handler called with the issues when validation fails.
 * @param context - Optional label describing the request, used in error output.
 * @returns The validated data, or the raw data if validation failed or was skipped.
 */
export function validate<T>(
  raw: unknown,
  schema: z.ZodType<T> | undefined,
  onError: OnValidationError,
  context?: string
): T {
  if (!schema) {
    return raw as T;
  }
  const result = schema.safeParse(raw);
  if (result.success) {
    return result.data;
  }
  onError({ context, issues: result.error.issues, raw });
  return raw as T;
}
