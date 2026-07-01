import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage async batches for bulk operations on the Recharge 2021-01 API.
 *
 * @see https://developer.rechargepayments.com/2021-01/async_batch_endpoints
 */
class AsyncBatchResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "async_batches";
    this.rechargeVersion = RechargeAPIVersion.v1;
  }

  /**
   * Create an async batch.
   *
   * `POST /async_batches`
   *
   * @param body - The async batch attributes to create.
   * @returns The created async batch record.
   */
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Retrieve an async batch.
   *
   * `GET /async_batches/{batchId}`
   *
   * @param batchId - The Recharge async batch ID.
   * @returns The async batch record.
   */
  get(batchId: number): Promise<unknown> {
    return this._get(`${this.url}/${batchId}`);
  }

  /**
   * List async batches.
   *
   * `GET /async_batches`
   *
   * @param query - Optional query parameters for filtering and pagination.
   * @returns The paginated list of async batch records.
   */
  list(query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}`, "async_batches", query);
  }

  /**
   * Trigger processing of an async batch.
   *
   * `POST /async_batches/{batchId}/process`
   *
   * @param batchId - The Recharge async batch ID.
   * @returns The async batch record being processed.
   */
  process(batchId: number): Promise<unknown> {
    return this._post(`${this.url}/${batchId}/process`);
  }

  /**
   * Create a task within an async batch.
   *
   * `POST /async_batches/{batchId}/tasks`
   *
   * @param batchId - The Recharge async batch ID.
   * @param body - The task attributes to create.
   * @returns The created async batch task record.
   */
  createTask(batchId: number, body: object): Promise<unknown> {
    return this._post(`${this.url}/${batchId}/tasks`, body);
  }

  /**
   * List tasks within an async batch.
   *
   * `GET /async_batches/{batchId}/tasks`
   *
   * @param batchId - The Recharge async batch ID.
   * @param query - Optional query parameters for filtering and pagination.
   * @returns The paginated list of async batch task records.
   */
  listTasks(batchId: number, query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}/${batchId}/tasks`, "tasks", query);
  }
}

export { AsyncBatchResource };
