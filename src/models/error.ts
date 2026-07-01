/**
 * Thrown when the Recharge API returns a non-2xx response.
 *
 * Exposes the {@link status} code and the parsed error {@link body} so callers
 * can inspect Recharge's error detail.
 */
class HTTPResponseError extends Error {
  /** The raw fetch response. */
  response: Response;
  /** The HTTP status code. */
  status: number;
  /** The parsed response body (JSON object, raw string, or `undefined`). */
  body: unknown;

  /**
   * @param response - The failed fetch response.
   * @param body - The already-read response body, if available.
   */
  constructor(response: Response, body?: unknown) {
    super(`HTTP Error Response: ${response.status} ${response.statusText}`);
    this.name = "HTTPResponseError";
    this.response = response;
    this.status = response.status;
    this.body = body;
  }
}

/**
 * Thrown for client-side API errors, such as exhausting retries or receiving a
 * body that cannot be parsed as JSON.
 */
class RechargeAPIError extends Error {
  /** @param message - Human-readable error detail. */
  constructor(message: string) {
    super(`Recharge API Error: ${message}`);
  }
}

/** Thrown for functionality that is declared but not yet implemented. */
class NotImplementedError extends Error {
  /** @param message - Human-readable error detail. */
  constructor(message: string) {
    super(`Not Implemented: ${message}`);
  }
}

export { HTTPResponseError, RechargeAPIError, NotImplementedError };
