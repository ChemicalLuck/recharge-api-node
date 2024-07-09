import fetch, { Request } from "node-fetch";
import type { RequestInit, Response } from "node-fetch";
import {
  RequestMethod,
  RechargeAPIVersion,
  HTTPResponseError,
  NotImplementedError,
  RechargeAPIError
} from "~/models";

class RechargeClient {
  private _headers: Record<string, string>;
  private _retries = 0;
  private readonly _maxRetries = 3;
  private readonly _retryDelay = 3000;

  constructor(apiKey: string) {
    this._headers = {
      "X-Recharge-Access-Token": apiKey,
      "X-Recharge-API-Version": RechargeAPIVersion.v1,
      "Content-Type": "application/json"
    };
  }

  _setVersion(value: RechargeAPIVersion): void {
    this._headers["X-Recharge-API-Version"] = value;
  }

  private async _retry(request: Request): Promise<Response> {
    if (this._retries >= this._maxRetries) {
      throw new RechargeAPIError("Max retries reached");
    }
    this._retries++;
    await this._delay(this._retryDelay);
    return this._send(request);
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

  private _constructRequestOptions(
    method: RequestMethod,
    json?: unknown
  ): RequestInit {
    const body =
      ["POST", "PUT", "PATCH"].includes(method) && json
        ? JSON.stringify(json)
        : null;

    return {
      method,
      headers: this._headers,
      body
    };
  }

  async _request(
    method: RequestMethod,
    url: string,
    query?: Record<string, string>,
    json?: unknown
  ): Promise<Response> {
    const urlWithParams = this._constructURL(url, query);
    const options = this._constructRequestOptions(method, json);
    const request = new Request(urlWithParams, options);

    return this._send(request);
  }

  async _send(request: Request): Promise<Response> {
    const response = await fetch(request);
    if (this._shouldRetry(response)) {
      return this._retry(request);
    }
    this._retries = 0;
    this._handleErrors(response);
    return response;
  }

  private _shouldRetry(response: Response): boolean {
    return response.status === 429 || response.status >= 500;
  }

  private _handleErrors(response: Response): void {
    if (!response.ok) {
      throw new HTTPResponseError(response);
    }
  }

  async _extractData<T>(response: Response): Promise<T> {
    return response.json() as Promise<T>;
  }

  _getNextPageV1(response: Response): string | undefined {
    const link = response.headers.get("link") ?? "";
    const nextCursor = link.match(/<([^>]+)>; rel="next"/);
    return nextCursor ? nextCursor[1] : undefined;
  }

  _getNextPageV2(_response: Response): string | undefined {
    throw new NotImplementedError("getNextPageV2");
  }

  _getNextPage(
    response: Response,
    version: RechargeAPIVersion
  ): string | undefined {
    switch (version) {
      case RechargeAPIVersion.v1:
        return this._getNextPageV1(response);
      case RechargeAPIVersion.v2:
        return this._getNextPageV2(response);
    }
  }

  async paginate<T>(
    url: string,
    version: RechargeAPIVersion,
    query?: Record<string, string>
  ): Promise<T[]> {
    this._setVersion(version);
    let data: T[] = [];
    while (url) {
      const response = await this._request(RequestMethod.GET, url, query);
      const responseData = await this._extractData<T[]>(response);
      data = data.concat(responseData);
      url = this._getNextPage(response, version) ?? "";
    }
    return data;
  }

  async get<T>(
    url: string,
    version: RechargeAPIVersion,
    query?: Record<string, string>
  ): Promise<T> {
    this._setVersion(version);
    const response = await this._request(RequestMethod.GET, url, query);
    return this._extractData<T>(response);
  }

  async post<T>(
    url: string,
    version: RechargeAPIVersion,
    json?: unknown
  ): Promise<T> {
    this._setVersion(version);
    const response = await this._request(
      RequestMethod.POST,
      url,
      undefined,
      json
    );
    return this._extractData<T>(response);
  }

  async put<T>(
    url: string,
    version: RechargeAPIVersion,
    json?: unknown
  ): Promise<T> {
    this._setVersion(version);
    const response = await this._request(
      RequestMethod.PUT,
      url,
      undefined,
      json
    );
    return this._extractData<T>(response);
  }

  async delete<T>(
    url: string,
    version: RechargeAPIVersion,
    json?: unknown
  ): Promise<T> {
    this._setVersion(version);
    const response = await this._request(
      RequestMethod.DELETE,
      url,
      undefined,
      json
    );
    return this._extractData<T>(response);
  }
}

export default RechargeClient;
