import { z } from "zod";

/**
 * A single task within an async batch (2021-01).
 *
 * Each task represents one queued operation whose body shape depends on the
 * parent batch's `batch_type`. The `body` is left loose because it mirrors
 * whatever resource payload the batch operates on.
 *
 * @see https://developer.rechargepayments.com/2021-01/async_batches/async_batch_object
 */
export const AsyncBatchTask = z.looseObject({
  id: z.number().nullable().optional(),
  batch_id: z.number().nullable().optional(),
  body: z
    .looseObject({
      code: z.string().nullable().optional(),
      discount_type: z.string().nullable().optional(),
      duration: z.string().nullable().optional(),
      status: z.string().nullable().optional(),
      value: z.number().nullable().optional()
    })
    .nullable()
    .optional(),
  result: z
    .looseObject({
      output: z
        .looseObject({
          discount: z
            .looseObject({
              applies_to: z.unknown().nullable().optional(),
              applies_to_id: z.unknown().nullable().optional(),
              applies_to_product_type: z.string().nullable().optional(),
              applies_to_resource: z.unknown().nullable().optional(),
              channel_settings: z
                .looseObject({
                  api: z.looseObject({}).nullable().optional(),
                  checkout_page: z.looseObject({}).nullable().optional(),
                  customer_portal: z.looseObject({}).nullable().optional(),
                  merchant_portal: z.looseObject({}).nullable().optional()
                })
                .nullable()
                .optional(),
              code: z.string().nullable().optional(),
              created_at: z.string().nullable().optional(),
              discount_type: z.string().nullable().optional(),
              duration: z.string().nullable().optional(),
              duration_usage_limit: z.unknown().nullable().optional(),
              ends_at: z.unknown().nullable().optional(),
              first_time_customer_restriction: z
                .unknown()
                .nullable()
                .optional(),
              id: z.number().nullable().optional(),
              once_per_customer: z.boolean().nullable().optional(),
              prerequisite_subtotal_min: z.unknown().nullable().optional(),
              starts_at: z.unknown().nullable().optional(),
              status: z.string().nullable().optional(),
              times_used: z.number().nullable().optional(),
              updated_at: z.string().nullable().optional(),
              usage_limit: z.unknown().nullable().optional(),
              value: z.number().nullable().optional()
            })
            .nullable()
            .optional()
        })
        .nullable()
        .optional(),
      status_code: z.number().nullable().optional()
    })
    .nullable()
    .optional(),
  status: z.string().nullable().optional(),
  queued_at: z.string().nullable().optional(),
  started_at: z.string().nullable().optional(),
  completed_at: z.string().nullable().optional(),
  deleted_at: z.unknown().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional()
});
export type AsyncBatchTask = z.infer<typeof AsyncBatchTask>;

/**
 * A Recharge async batch (2021-01).
 *
 * Async batches queue many mutations of a single `batch_type` for background
 * processing.
 *
 * @see https://developer.rechargepayments.com/2021-01/async_batches/async_batch_object
 */
export const AsyncBatch = z.looseObject({
  id: z.number().nullable().optional(),
  batch_type: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  version: z.string().nullable().optional(),
  submitted_at: z.string().nullable().optional(),
  closed_at: z.unknown().nullable().optional(),
  deleted_at: z.unknown().nullable().optional(),
  expired_at: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  total_task_count: z.number().nullable().optional(),
  success_task_count: z.number().nullable().optional(),
  fail_task_count: z.number().nullable().optional()
});
export type AsyncBatch = z.infer<typeof AsyncBatch>;

/** Envelope returned by single-batch endpoints. */
export const AsyncBatchResponse = z.object({ async_batch: AsyncBatch });
export type AsyncBatchResponse = z.infer<typeof AsyncBatchResponse>;

/** Query parameters accepted by `GET /async_batches`. */
export const AsyncBatchListParams = z.looseObject({
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional()
});
export type AsyncBatchListParams = z.infer<typeof AsyncBatchListParams>;

/** Body for `POST /async_batches`. */
export const AsyncBatchCreate = z.looseObject({
  batch_type: z.string().optional()
});
export type AsyncBatchCreate = z.infer<typeof AsyncBatchCreate>;

/** Query parameters accepted by `GET /async_batches/{id}/tasks`. */
export const AsyncBatchTaskListParams = z.looseObject({
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  ids: z.string().optional()
});
export type AsyncBatchTaskListParams = z.infer<typeof AsyncBatchTaskListParams>;

/** Body for `POST /async_batches/{id}/tasks`. */
export const AsyncBatchTaskCreate = z.looseObject({
  tasks: z.array(z.looseObject({})).optional()
});
export type AsyncBatchTaskCreate = z.infer<typeof AsyncBatchTaskCreate>;

/** Best-effort loose envelope returned when creating tasks. */
export const AsyncBatchTaskCreateResponse = z.looseObject({
  async_batch_tasks: z.array(AsyncBatchTask).nullable().optional()
});
export type AsyncBatchTaskCreateResponse = z.infer<
  typeof AsyncBatchTaskCreateResponse
>;

/** Best-effort loose envelope returned by the process endpoint. */
export const AsyncBatchProcessResponse = z.looseObject({
  async_batch: AsyncBatch.nullable().optional()
});
export type AsyncBatchProcessResponse = z.infer<
  typeof AsyncBatchProcessResponse
>;
