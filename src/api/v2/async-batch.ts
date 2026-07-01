import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import RechargeResource from "../resource";

/**
 * Manage async batches for bulk operations on the 2021-11 API surface.
 *
 * @see https://developer.rechargepayments.com/2021-11/async_batches
 */
class AsyncBatchResource extends RechargeResource {
  constructor(client: RechargeClient) {
    super(client);
    this.resource = "async_batches";
    this.rechargeVersion = RechargeAPIVersion.v2;
  }

  /**
   * Create a new async batch.
   *
   * `POST /async_batches`
   *
   * @param body - The async batch payload.
   * @returns The created async batch record.
   */
  create(body: object): Promise<unknown> {
    return this._post(`${this.url}`, body);
  }

  /**
   * Retrieve a single async batch.
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
   * List async batches, paginating through all results.
   *
   * `GET /async_batches`
   *
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of async batch records.
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
   * @returns The API response for the process request.
   */
  process(batchId: number): Promise<unknown> {
    return this._post(`${this.url}/${batchId}/process`);
  }

  /**
   * Add a task to an async batch.
   *
   * `POST /async_batches/{batchId}/tasks`
   *
   * @param batchId - The Recharge async batch ID.
   * @param body - The task payload.
   * @returns The created task record.
   */
  createTask(batchId: number, body: object): Promise<unknown> {
    return this._post(`${this.url}/${batchId}/tasks`, body);
  }

  /**
   * List the tasks belonging to an async batch, paginating through all results.
   *
   * `GET /async_batches/{batchId}/tasks`
   *
   * @param batchId - The Recharge async batch ID.
   * @param query - Optional query string parameters for filtering and pagination.
   * @returns The list of task records.
   */
  listTasks(batchId: number, query?: Record<string, string>): Promise<unknown> {
    return this._paginate(`${this.url}/${batchId}/tasks`, "tasks", query);
  }
}

export { AsyncBatchResource };
