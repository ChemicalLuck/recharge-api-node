import type { z } from "zod";
import {
  RequestMethod,
  RechargeAPIVersion,
  HTTPResponseError,
  RechargeAPIError
} from "~/models";
import {
  validate,
  defaultOnValidationError,
  type OnValidationError
} from "~/validation";

// `fetch`, `Request` and `Response` are provided as globals by Node.js 20+.

/**
 * Options for configuring a {@link RechargeClient}.
 */
export interface RechargeClientOptions {
  /**
   * Handler invoked when a response body fails runtime schema validation.
   * Validation never throws; after this runs the raw data is still returned.
   * Defaults to a `console.warn` logger.
   */
  onValidationError?: OnValidationError;
  /**
   * Whether to run runtime response validation at all. When `false`, schemas
   * are ignored and raw parsed data is returned (types are still applied at
   * compile time). Defaults to `true`.
   */
  validate?: boolean;
}

/**
 * Low-level HTTP client for the Recharge API.
 *
 * Handles authentication, per-version headers, JSON (de)serialization,
 * automatic retries on `429`/`5xx` responses (honouring `Retry-After`), and
 * transparent pagination (Link headers for 2021-01, cursors for 2021-11).
 *
 * Resource classes talk to this via {@link get}, {@link post}, {@link put},
 * {@link delete} and {@link paginate}; consumers normally use the high-level
 * `Recharge` facade instead of instantiating this directly.
 */
class RechargeClient {
  private readonly _baseHeaders: Record<string, string>;
  private readonly _maxRetries = 3;
  private readonly _retryDelay = 3000;
  private readonly _onValidationError: OnValidationError;
  private readonly _validateEnabled: boolean;

  /**
   * @param apiKey - The Recharge store API token, sent as the
   * `X-Recharge-Access-Token` header on every request.
   * @param options - Optional validation configuration.
   */
  constructor(apiKey: string, options: RechargeClientOptions = {}) {
    this._baseHeaders = {
      "X-Recharge-Access-Token": apiKey,
      "Content-Type": "application/json"
    };
    this._onValidationError =
      options.onValidationError ?? defaultOnValidationError;
    this._validateEnabled = options.validate ?? true;
  }

  /**
   * Validate parsed data against a schema, honouring the client-level
   * `validate` toggle. Never throws — see {@link validate}.
   */
  private _validate<T>(
    raw: unknown,
    schema?: z.ZodType<T>,
    context?: string
  ): T {
    if (!this._validateEnabled) {
      return raw as T;
    }
    return validate<T>(raw, schema, this._onValidationError, context);
  }

  private _buildHeaders(version: RechargeAPIVersion): Record<string, string> {
    return {
      ...this._baseHeaders,
      "X-Recharge-Version": version
    };
  }

  private async _delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => setTimeout(resolve, ms));
  }

  private _constructURL(url: string, query?: Record<string, string>): string {
    const urlWithParams = new URL(url);
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        urlWithParams.searchParams.append(key, value);
      });
    }
    return urlWithParams.toString();
  }

  private _serializeBody(method: RequestMethod, json?: unknown): string | null {
    return method !== RequestMethod.GET && json !== undefined
      ? JSON.stringify(json)
      : null;
  }

  private async _request(
    method: RequestMethod,
    version: RechargeAPIVersion,
    url: string,
    query?: Record<string, string>,
    json?: unknown
  ): Promise<Response> {
    const urlWithParams = this._constructURL(url, query);
    const headers = this._buildHeaders(version);
    const body = this._serializeBody(method, json);

    // A Request body stream is consumed once it is sent, so a fresh Request is
    // built for every attempt rather than reusing a single instance on retry.
    let attempt = 0;
    for (;;) {
      const request = new Request(urlWithParams, { method, headers, body });
      const response = await fetch(request);

      if (this._shouldRetry(response)) {
        if (attempt >= this._maxRetries) {
          throw new RechargeAPIError("Max retries reached");
        }
        attempt++;
        await this._delay(this._retryAfterMs(response));
        continue;
      }

      await this._handleErrors(response);
      return response;
    }
  }

  private _shouldRetry(response: Response): boolean {
    return response.status === 429 || response.status >= 500;
  }

  private _retryAfterMs(response: Response): number {
    const header = response.headers.get("retry-after");
    if (header) {
      const seconds = Number(header);
      if (!Number.isNaN(seconds) && seconds >= 0) {
        return seconds * 1000;
      }
    }
    return this._retryDelay;
  }

  private async _handleErrors(response: Response): Promise<void> {
    if (!response.ok) {
      const body = await this._safeParseBody(response);
      throw new HTTPResponseError(response, body);
    }
  }

  private async _safeParseBody(response: Response): Promise<unknown> {
    try {
      const text = await response.text();
      if (!text) {
        return undefined;
      }
      try {
        return JSON.parse(text) as unknown;
      } catch {
        return text;
      }
    } catch {
      return undefined;
    }
  }

  /**
   * Parse a successful response body as JSON.
   *
   * Returns `undefined` for `204 No Content` and empty bodies (common for
   * `delete` and action endpoints) instead of throwing.
   *
   * @typeParam T - Expected shape of the parsed response.
   * @param response - The fetch response to read.
   * @param schema - Optional schema to validate the parsed body against.
   * @param context - Optional label describing the request, used in validation output.
   * @returns The parsed body, or `undefined` when there is no content.
   * @throws {RechargeAPIError} If a non-empty body is not valid JSON.
   */
  async _extractData<T>(
    response: Response,
    schema?: z.ZodType<T>,
    context?: string
  ): Promise<T> {
    // Many endpoints (deletes, and some actions) reply 204 / empty body.
    if (response.status === 204) {
      return undefined as T;
    }
    const text = await response.text();
    if (!text) {
      return undefined as T;
    }
    let raw: unknown;
    try {
      raw = JSON.parse(text);
    } catch {
      throw new RechargeAPIError(
        `Failed to parse response body as JSON (status ${response.status})`
      );
    }
    return this._validate<T>(raw, schema, context);
  }

  private _getNextPageV1(response: Response): string | undefined {
    const link = response.headers.get("link") ?? "";
    const match = /<([^>]+)>; rel="next"/.exec(link);
    return match ? match[1] : undefined;
  }

  private async _paginateV1<T>(
    url: string,
    responseKey: string,
    query?: Record<string, string>
  ): Promise<T[]> {
    let data: T[] = [];
    let currentUrl: string | undefined = url;
    let isFirstPage = true;

    while (currentUrl) {
      const response = await this._request(
        RequestMethod.GET,
        RechargeAPIVersion.v1,
        currentUrl,
        isFirstPage ? query : undefined
      );
      const responseData =
        await this._extractData<Record<string, T[]>>(response);
      data = data.concat(responseData?.[responseKey] ?? []);
      currentUrl = this._getNextPageV1(response);
      isFirstPage = false;
    }
    return data;
  }

  private async _paginateV2<T>(
    url: string,
    responseKey: string,
    query?: Record<string, string>
  ): Promise<T[]> {
    let data: T[] = [];
    let cursor: string | undefined;

    do {
      // On 2021-11, once a cursor is supplied Recharge rejects every other
      // filter param except `limit`, so only those two are sent after page one.
      const currentQuery: Record<string, string> = cursor
        ? query?.limit
          ? { cursor, limit: query.limit }
          : { cursor }
        : { ...query };
      const response = await this._request(
        RequestMethod.GET,
        RechargeAPIVersion.v2,
        url,
        currentQuery
      );
      const responseData = await this._extractData<
        Record<string, T[]> & { next_cursor?: string }
      >(response);
      data = data.concat(responseData?.[responseKey] ?? []);
      cursor = responseData?.next_cursor ?? undefined;
    } while (cursor);

    return data;
  }

  /**
   * Fetch every page of a list endpoint and return the concatenated items.
   *
   * @typeParam T - Element type of the list.
   * @param url - The absolute endpoint URL.
   * @param version - API version, which selects the pagination strategy.
   * @param responseKey - The response property holding the array (e.g. `"charges"`).
   * @param query - Optional query parameters (applied to the first page).
   * @param itemSchema - Optional schema to validate each list element against.
   * @returns All items across every page.
   */
  async paginate<T>(
    url: string,
    version: RechargeAPIVersion,
    responseKey: string,
    query?: Record<string, string>,
    itemSchema?: z.ZodType<T>
  ): Promise<T[]> {
    const items =
      version === RechargeAPIVersion.v2
        ? await this._paginateV2<T>(url, responseKey, query)
        : await this._paginateV1<T>(url, responseKey, query);
    if (!itemSchema) {
      return items;
    }
    // Validate each element individually so one drifted row only warns for
    // that row instead of discarding the whole page.
    return items.map((item, index) =>
      this._validate<T>(item, itemSchema, `${responseKey}[${index}]`)
    );
  }

  /**
   * Perform a `GET` request and return the parsed body.
   *
   * @typeParam T - Expected response shape.
   * @param url - The absolute endpoint URL.
   * @param version - API version to request.
   * @param query - Optional query parameters.
   * @param schema - Optional schema to validate the response body against.
   * @returns The parsed response body.
   */
  async get<T>(
    url: string,
    version: RechargeAPIVersion,
    query?: Record<string, string>,
    schema?: z.ZodType<T>
  ): Promise<T> {
    const response = await this._request(
      RequestMethod.GET,
      version,
      url,
      query
    );
    return this._extractData<T>(response, schema, `GET ${url}`);
  }

  /**
   * Perform a `POST` request with an optional JSON body.
   *
   * @typeParam T - Expected response shape.
   * @param url - The absolute endpoint URL.
   * @param version - API version to request.
   * @param json - Optional request body, serialized as JSON.
   * @param schema - Optional schema to validate the response body against.
   * @returns The parsed response body.
   */
  async post<T>(
    url: string,
    version: RechargeAPIVersion,
    json?: unknown,
    schema?: z.ZodType<T>
  ): Promise<T> {
    const response = await this._request(
      RequestMethod.POST,
      version,
      url,
      undefined,
      json
    );
    return this._extractData<T>(response, schema, `POST ${url}`);
  }

  /**
   * Perform a `PUT` request with an optional JSON body.
   *
   * @typeParam T - Expected response shape.
   * @param url - The absolute endpoint URL.
   * @param version - API version to request.
   * @param json - Optional request body, serialized as JSON.
   * @param schema - Optional schema to validate the response body against.
   * @returns The parsed response body.
   */
  async put<T>(
    url: string,
    version: RechargeAPIVersion,
    json?: unknown,
    schema?: z.ZodType<T>
  ): Promise<T> {
    const response = await this._request(
      RequestMethod.PUT,
      version,
      url,
      undefined,
      json
    );
    return this._extractData<T>(response, schema, `PUT ${url}`);
  }

  /**
   * Perform a `DELETE` request with an optional JSON body.
   *
   * Some endpoints (e.g. collection product removal, bulk deletes) require a
   * request body on `DELETE`.
   *
   * @typeParam T - Expected response shape.
   * @param url - The absolute endpoint URL.
   * @param version - API version to request.
   * @param json - Optional request body, serialized as JSON.
   * @param schema - Optional schema to validate the response body against.
   * @returns The parsed response body.
   */
  async delete<T>(
    url: string,
    version: RechargeAPIVersion,
    json?: unknown,
    schema?: z.ZodType<T>
  ): Promise<T> {
    const response = await this._request(
      RequestMethod.DELETE,
      version,
      url,
      undefined,
      json
    );
    return this._extractData<T>(response, schema, `DELETE ${url}`);
  }
}

export default RechargeClient;
