import type RechargeClient from "~/client";
import { RechargeAPIVersion } from "~/models";
import {
  AsyncBatch,
  AsyncBatchTask,
  AsyncBatchResponse,
  AsyncBatchProcessResponse,
  AsyncBatchTaskCreateResponse,
  type AsyncBatchListParams,
  type AsyncBatchCreate,
  type AsyncBatchTaskListParams,
  type AsyncBatchTaskCreate
} from "~/models/api/v1/async-batch";
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
  create(body: AsyncBatchCreate): Promise<AsyncBatchResponse> {
    return this._post(`${this.url}`, body, AsyncBatchResponse);
  }

  /**
   * Retrieve an async batch.
   *
   * `GET /async_batches/{batchId}`
   *
   * @param batchId - The Recharge async batch ID.
   * @returns The async batch record.
   */
  get(batchId: number): Promise<AsyncBatchResponse> {
    return this._get(`${this.url}/${batchId}`, undefined, AsyncBatchResponse);
  }

  /**
   * List async batches.
   *
   * `GET /async_batches`
   *
   * @param query - Optional query parameters for filtering and pagination.
   * @returns The paginated list of async batch records.
   */
  list(query?: AsyncBatchListParams): Promise<AsyncBatch[]> {
    return this._paginate(
      `${this.url}`,
      "async_batches",
      query as Record<string, string> | undefined,
      AsyncBatch
    );
  }

  /**
   * Trigger processing of an async batch.
   *
   * `POST /async_batches/{batchId}/process`
   *
   * @param batchId - The Recharge async batch ID.
   * @returns The async batch record being processed.
   */
  process(batchId: number): Promise<AsyncBatchProcessResponse> {
    return this._post(
      `${this.url}/${batchId}/process`,
      undefined,
      AsyncBatchProcessResponse
    );
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
  createTask(
    batchId: number,
    body: AsyncBatchTaskCreate
  ): Promise<AsyncBatchTaskCreateResponse> {
    return this._post(
      `${this.url}/${batchId}/tasks`,
      body,
      AsyncBatchTaskCreateResponse
    );
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
  listTasks(
    batchId: number,
    query?: AsyncBatchTaskListParams
  ): Promise<AsyncBatchTask[]> {
    return this._paginate(
      `${this.url}/${batchId}/tasks`,
      "tasks",
      query as Record<string, string> | undefined,
      AsyncBatchTask
    );
  }
}

export { AsyncBatchResource };
