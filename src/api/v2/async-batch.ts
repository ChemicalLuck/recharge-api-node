import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

class AsyncBatchResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "async_batches";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  get(batchId: number): Promise<unknown> {
    return this._get(`${this.url}/${batchId}`);
  }

  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "async_batches", query);
  }

  process(batchId: number): Promise<unknown> {
    return this._post(`${this.url}/${batchId}/process`);
  }

  createTask(batchId: number, body: object): Promise<unknown> {
    return this._post(`${this.url}/${batchId}/tasks`, body);
  }

  listTasks(batchId: number, query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}/${batchId}/tasks`, "tasks", query);
  }
}

export { AsyncBatchResource };
