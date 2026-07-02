import { z } from "zod";

/**
 * Body for `POST /notifications` (2021-11).
 *
 * Triggers a templated customer notification (e.g. an email). The exact
 * accepted fields depend on the notification `type`/`template_type`.
 *
 * @see https://developer.rechargepayments.com/2021-11/notifications
 */
export const NotificationSendBody = z.looseObject({
  customer_id: z.union([z.number(), z.string()]).optional(),
  type: z.string().optional(),
  template_type: z.string().optional(),
  template_vars: z.looseObject({}).optional()
});
export type NotificationSendBody = z.infer<typeof NotificationSendBody>;

/**
 * Best-effort response returned by `POST /notifications`.
 *
 * The notifications endpoint does not document a stable response envelope, so
 * this is intentionally permissive.
 */
export const NotificationResponse = z.looseObject({});
export type NotificationResponse = z.infer<typeof NotificationResponse>;
