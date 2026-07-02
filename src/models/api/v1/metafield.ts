import { z } from "zod";

/**
 * A Recharge metafield (2021-01).
 *
 * Metafields attach arbitrary key/value data to another Recharge resource
 * (the "owner").
 *
 * @see https://developer.rechargepayments.com/2021-01/metafields/metafield_object
 */
export const Metafield = z.looseObject({
  id: z.number().nullable().optional(),
  owner_resource: z.string().nullable().optional(),
  owner_id: z.number().nullable().optional(),
  namespace: z.string().nullable().optional(),
  key: z.string().nullable().optional(),
  value: z.string().nullable().optional(),
  value_type: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional()
});
export type Metafield = z.infer<typeof Metafield>;

/** Envelope returned by single-metafield endpoints. */
export const MetafieldResponse = z.object({ metafield: Metafield });
export type MetafieldResponse = z.infer<typeof MetafieldResponse>;

/** Response returned by `GET /metafields/count`. */
export const MetafieldCountResponse = z.object({ count: z.number() });
export type MetafieldCountResponse = z.infer<typeof MetafieldCountResponse>;

/** Query parameters accepted by `GET /metafields`. */
export const MetafieldListParams = z.looseObject({
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  owner_resource: z.string().optional(),
  owner_id: z.string().optional(),
  namespace: z.string().optional()
});
export type MetafieldListParams = z.infer<typeof MetafieldListParams>;

/** Body for `POST /metafields`. */
export const MetafieldCreateBody = z.looseObject({
  owner_resource: z.string().optional(),
  owner_id: z.union([z.number(), z.string()]).optional(),
  namespace: z.string().optional(),
  key: z.string().optional(),
  value: z.string().optional(),
  value_type: z.string().optional(),
  description: z.string().optional()
});
export type MetafieldCreateBody = z.infer<typeof MetafieldCreateBody>;

/** Body for `PUT /metafields/{id}`. */
export const MetafieldUpdateBody = z.looseObject({
  value: z.string().optional(),
  value_type: z.string().optional(),
  description: z.string().optional()
});
export type MetafieldUpdateBody = z.infer<typeof MetafieldUpdateBody>;
