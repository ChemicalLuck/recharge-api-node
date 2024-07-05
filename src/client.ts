import fetch, { Request, Response } from "node-fetch";
import { RechargeAPIVersion, RequestMethod } from "./models";
import {
  HTTPResponseError,
  NotImplementedError,
  RechargeAPIError
} from "./models/error";

class RechargeClient {
  private _headers: Record<string, string> = {};
  private _retries = 0;
  private readonly _maxRetries = 3;
  private readonly _retryDelay = 3000;

  constructor(api_key: string) {
    this.headers = {
      "X-Recharge-Access-Token": api_key,
      "X-Recharge-API-Version": RechargeAPIVersion.v1,
      "Content-Type": "application/json"
    };
  }

  get retries() {
    return this._retries;
  }

  set retries(value: number) {
    this._retries = value;
  }

  get maxRetries() {
    return this._maxRetries;
  }

  get retryDelay() {
    return this._retryDelay;
  }

  public get headers(): Record<string, string> {
    return this._headers;
  }
  public set headers(value: Record<string, string>) {
    this._headers = value;
  }

  _setVersion(value: RechargeAPIVersion) {
    this.headers["X-Recharge-API-Version"] = value;
  }

  private async _retry(request: Request): Promise<Response> {
    if (this._retries >= this._maxRetries) {
      console.error("Max retries reached");
      throw new RechargeAPIError("Max retries reached");
    }

    this.retries++;
    console.info(
      `Retrying: ${this.retries}/${this.maxRetries} retries, waiting ${this.retryDelay}ms...`
    );
    await this._delay(this._retryDelay);
    return this._send(request);
  }

  private async _delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private _constructURL(url: string, query?: Record<string, string>): string {
    const urlWithParams = new URL(url);
    if (query) {
      Object.keys(query).forEach((key) =>
        urlWithParams.searchParams.append(key, query[key])
      );
    }
    return urlWithParams.toString();
  }

  private _constructRequestOptions(
    method: RequestMethod,
    json?: unknown
  ): RequestInit {
    return {
      method,
      headers: this.headers,
      body:
        ["POST", "PUT", "PATCH"].includes(method.toUpperCase()) && json
          ? JSON.stringify(json)
          : undefined
    };
  }

  async _request(
    method: RequestMethod,
    url: string,
    query?: Record<string, string>,
    json?: unknown
  ): Promise<Response> {
    const urlWithParams = this._constructURL(url, query);
    const options: RequestInit = this._constructRequestOptions(method, json);
    const request = new Request(urlWithParams, options);

    return this._send(request);
  }

  async _send(request: Request): Promise<Response> {
    const response = await fetch(request);

    if (response.status === 429 || response.status >= 500) {
      console.warn(
        response.status === 429
          ? "Rate limited, retrying..."
          : "Server error, retrying..."
      );
      return this._retry(request);
    }
    this.retries = 0;

    if (!response.ok) {
      throw new HTTPResponseError(response);
    }

    return response;
  }

  async _extractData<T>(response: Response): Promise<T> {
    return response.json() as Promise<T>;
  }

  _getNextPageV1(response: Response): string | undefined {
    const link = response.headers.get("link") || "";
    const next_cursor = link.match(/<([^>]+)>; rel="next"/);
    if (!next_cursor) {
      return undefined;
    }
    return next_cursor[1];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      url = this._getNextPage(response, version) || "";
    }
    return data;
  }

  async get<T>(
    url: string,
    version: RechargeAPIVersion,
    query?: Record<string, string>
  ): Promise<T> {
    this._setVersion(version);
    return this._request(RequestMethod.GET, url, query).then(
      this._extractData<T>
    );
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

export { RechargeClient };
export default RechargeClient;
