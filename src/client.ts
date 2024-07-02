import fetch, { Request } from "node-fetch";
import { RechargeAPIVersion, RequestMethod } from "./models";
import { HTTPResponseError, RechargeAPIError } from "./models/error";

export default class RechargeClient {
  headers: {
    "X-Recharge-Access-Token": string;
    "X-Recharge-API-Version": RechargeAPIVersion;
    "Content-Type": string;
  };
  private _retries = 0;
  private _maxRetries = 3;
  private _retryDelay = 1000;

  constructor(api_key: string) {
    this.headers = {
      "X-Recharge-Access-Token": api_key,
      "X-Recharge-API-Version": RechargeAPIVersion.v1,
      "Content-Type": "application/json"
    };
  }

  setHeaders(headers: Record<string, string>) {
    this.headers = {
      ...this.headers,
      ...headers
    };
  }

  async _retry<T>(request: Request): Promise<T> {
    if (this._retries >= this._maxRetries) {
      console.error("Max retries reached");
      throw new RechargeAPIError("Max retries reached");
    }

    this._retries++;
    console.info(
      `Retrying: ${this._retries}/${this._maxRetries} retries, waiting ${this._retryDelay}ms...`
    );
    await new Promise((resolve) => setTimeout(resolve, this._retryDelay));
    return this._send<T>(request);
  }

  async _request<T>(
    method: RequestMethod,
    url: string,
    query?: Record<string, any>,
    json?: Record<string, any>
  ): Promise<T> {
    const urlWithParams = new URL(url);
    if (query) {
      Object.keys(query).forEach((key) =>
        urlWithParams.searchParams.append(key, query[key])
      );
    }

    const options: RequestInit = {
      method,
      headers: this.headers,
      body:
        ["POST", "PUT", "PATCH"].includes(method.toUpperCase()) && json
          ? JSON.stringify(json)
          : undefined
    };

    const request = new Request(urlWithParams.toString(), options);

    return this._send<T>(request);
  }

  async _send<T>(request: Request): Promise<T> {
    try {
      const response = await fetch(request);

      if (response.status === 429) {
        console.warn("Rate limited, retrying...");
        return this._retry(request);
      }
      if (response.status >= 500) {
        console.warn("Server error, retrying...");
        return this._retry(request);
      }
      this._retries = 0;

      if (!response.ok) {
        throw new HTTPResponseError(response);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      throw error;
    }
  }

  async get<T>(url: string, query?: Record<string, any>): Promise<T> {
    return this._request<T>(RequestMethod.GET, url, query);
  }

  async post<T>(url: string, json?: Record<string, any>): Promise<T> {
    return this._request<T>(RequestMethod.POST, url, undefined, json);
  }

  async put<T>(url: string, json?: Record<string, any>): Promise<T> {
    return this._request<T>(RequestMethod.PUT, url, undefined, json);
  }

  async delete<T>(url: string): Promise<T> {
    return this._request<T>(RequestMethod.DELETE, url);
  }
}
