import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";

/**
 * Base class for every Recharge API resource.
 *
 * Subclasses set {@link resource} (the URL path segment, e.g. `"charges"`) and
 * {@link rechargeVersion}, then build endpoint URLs from {@link url} and issue
 * requests via the `_get`/`_post`/`_put`/`_delete`/`_paginate` helpers, which
 * forward to the shared {@link RechargeClient} with the correct API version.
 */
abstract class RechargeResource {
  /** API origin shared by all resources. */
  protected readonly baseUrl: string = "https://api.rechargeapps.com";
  /** URL path segment for this resource (e.g. `"charges"`). Must be set by subclasses. */
  protected resource: string | null = null;
  /** API version this resource targets. Defaults to 2021-01. */
  protected rechargeVersion: RechargeAPIVersion = RechargeAPIVersion.v1;
  /** Shared HTTP client. */
  protected client: RechargeClient;

  /**
   * @param client - The shared {@link RechargeClient} used for all requests.
   */
  protected constructor(client: RechargeClient) {
    this.client = client;
  }

  /**
   * Base URL for this resource (`{baseUrl}/{resource}`).
   *
   * @throws {Error} If the subclass did not set {@link resource}.
   */
  protected get url(): string {
    if (!this.resource) {
      throw new Error("Resource not set");
    }
    return `${this.baseUrl}/${this.resource}`;
  }

  /** Issue a `GET` for this resource's API version. */
  protected _get<T>(url: string, query?: Record<string, string>): Promise<T> {
    return this.client.get(url, this.rechargeVersion, query);
  }

  /** Issue a `POST` for this resource's API version. */
  protected _post<T>(url: string, body?: unknown): Promise<T> {
    return this.client.post(url, this.rechargeVersion, body);
  }

  /** Issue a `PUT` for this resource's API version. */
  protected _put<T>(url: string, body?: unknown): Promise<T> {
    return this.client.put(url, this.rechargeVersion, body);
  }

  /** Issue a `DELETE` for this resource's API version. */
  protected _delete<T>(url: string, body?: unknown): Promise<T> {
    return this.client.delete(url, this.rechargeVersion, body);
  }

  /** Fetch and concatenate every page of a list endpoint. */
  protected _paginate<T>(
    url: string,
    responseKey: string,
    query?: Record<string, string>
  ): Promise<T[]> {
    return this.client.paginate(url, this.rechargeVersion, responseKey, query);
  }
}

export default RechargeResource;
