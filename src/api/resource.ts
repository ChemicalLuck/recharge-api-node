import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";

abstract class RechargeResource {
  protected readonly baseUrl: string = "https://api.rechargeapps.com";
  protected resource: string | null = null;
  protected rechargeVersion: RechargeAPIVersion = RechargeAPIVersion.v1;
  protected client: RechargeClient;

  protected constructor(client: RechargeClient) {
    this.client = client;
  }

  protected get url(): string {
    if (!this.resource) {
      throw new Error("Resource not set");
    }
    return `${this.baseUrl}/${this.rechargeVersion}/${this.resource}`;
  }

  protected _get<T>(url: string, query?: Record<string, string>): Promise<T> {
    return this.client.get(url, this.rechargeVersion, query);
  }

  protected _post<T>(url: string, body?: unknown): Promise<T> {
    return this.client.post(url, this.rechargeVersion, body);
  }

  protected _put<T>(url: string, body?: unknown): Promise<T> {
    return this.client.put(url, this.rechargeVersion, body);
  }

  protected _delete<T>(url: string, body?: unknown): Promise<T> {
    return this.client.delete(url, this.rechargeVersion, body);
  }

  protected _paginate<T>(
    url: string,
    query?: Record<string, string>
  ): Promise<T[]> {
    return this.client.paginate(url, this.rechargeVersion, query);
  }
}

export default RechargeResource;
