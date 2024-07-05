import { RechargeClient } from "../client";
import { RechargeAPIVersion } from "../models";

abstract class RechargeResource {
  protected readonly base_url: string = "https://api.rechargeapps.com";
  protected resource: string | null = null;
  protected recharge_version: RechargeAPIVersion = RechargeAPIVersion.v1;
  protected client: RechargeClient;

  protected constructor(client: RechargeClient) {
    this.client = client;
  }

  protected get url(): string {
    if (!this.resource) {
      throw new Error("Resource not set");
    }
    return `${this.base_url}/${this.recharge_version}/${this.resource}`;
  }

  protected _get<T>(url: string, query?: Record<string, string>): Promise<T> {
    return this.client.get(url, this.recharge_version, query);
  }

  protected _post<T>(url: string, body?: unknown): Promise<T> {
    return this.client.post(url, this.recharge_version, body);
  }

  protected _put<T>(url: string, body?: unknown): Promise<T> {
    return this.client.put(url, this.recharge_version, body);
  }

  protected _delete<T>(url: string, body?: unknown): Promise<T> {
    return this.client.delete(url, this.recharge_version, body);
  }

  protected _paginate<T>(
    url: string,
    query?: Record<string, string>
  ): Promise<T[]> {
    return this.client.paginate(url, this.recharge_version, query);
  }
}

export default RechargeResource;
