import { z } from "zod";

/**
 * A Recharge event (2021-11).
 *
 * Events record actions taken against store objects (charges, subscriptions,
 * addresses, etc.). Only the `list` endpoint is modeled.
 *
 * @see https://developer.rechargepayments.com/2021-11/events/event_object
 */
export const Event = z.looseObject({
  id: z.number().nullable().optional(),
  object_type: z.string().nullable().optional(),
  object_id: z.number().nullable().optional(),
  customer_id: z.number().nullable().optional(),
  verb: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  custom_attributes: z
    .array(
      z.looseObject({
        key: z.string().nullable().optional(),
        value: z.string().nullable().optional()
      })
    )
    .nullable()
    .optional(),
  updated_attributes: z
    .array(
      z.looseObject({
        attribute: z.string().nullable().optional(),
        previous_value: z.string().nullable().optional(),
        value: z.string().nullable().optional()
      })
    )
    .nullable()
    .optional(),
  source: z
    .looseObject({
      account_email: z.unknown().nullable().optional(),
      account_id: z.unknown().nullable().optional(),
      api_token_id: z.number().nullable().optional(),
      api_token_name: z.string().nullable().optional(),
      origin: z.string().nullable().optional(),
      user_type: z.unknown().nullable().optional()
    })
    .nullable()
    .optional(),
  created_at: z.string().nullable().optional()
});
export type Event = z.infer<typeof Event>;

/** Query parameters accepted by `GET /events`. */
export const EventListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  object_type: z.string().optional(),
  object_id: z.string().optional(),
  customer_id: z.string().optional(),
  verb: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional()
});
export type EventListParams = z.infer<typeof EventListParams>;
