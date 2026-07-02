import { z } from "zod";

/**
 * A Recharge webhook (2021-11).
 *
 * Webhooks deliver event notifications to a subscriber URL (`address`) for a
 * given `topic`.
 *
 * @see https://developer.rechargepayments.com/2021-11/webhooks/webhook_object
 */
export const Webhook = z.looseObject({
  id: z.number().nullable().optional(),
  address: z.string().nullable().optional(),
  topic: z.string().nullable().optional(),
  included_objects: z.array(z.string()).nullable().optional(),
  version: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional()
});
export type Webhook = z.infer<typeof Webhook>;

/** Envelope returned by single-webhook endpoints. */
export const WebhookResponse = z.object({ webhook: Webhook });
export type WebhookResponse = z.infer<typeof WebhookResponse>;

/** Query parameters accepted by `GET /webhooks`. */
export const WebhookListParams = z.looseObject({
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  address: z.string().optional(),
  topic: z.string().optional()
});
export type WebhookListParams = z.infer<typeof WebhookListParams>;

/** Body for `POST /webhooks`. */
export const WebhookCreateBody = z.looseObject({
  address: z.string().optional(),
  topic: z.string().optional(),
  included_objects: z.array(z.string()).optional()
});
export type WebhookCreateBody = z.infer<typeof WebhookCreateBody>;

/** Body for `PUT /webhooks/{id}`. */
export const WebhookUpdateBody = z.looseObject({
  address: z.string().optional(),
  topic: z.string().optional(),
  included_objects: z.array(z.string()).optional()
});
export type WebhookUpdateBody = z.infer<typeof WebhookUpdateBody>;

/** Body for `POST /webhooks/{id}/test`. */
export const WebhookTestBody = z.looseObject({
  topic: z.string().optional()
});
export type WebhookTestBody = z.infer<typeof WebhookTestBody>;
