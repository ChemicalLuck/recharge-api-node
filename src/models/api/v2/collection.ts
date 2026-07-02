import { z } from "zod";

/**
 * A Recharge collection (2021-11).
 *
 * @see https://developer.rechargepayments.com/2021-11/collections/collection_object
 */
export const Collection = z.looseObject({
  created_at: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  id: z.number().nullable().optional(),
  sort_order: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional()
});
export type Collection = z.infer<typeof Collection>;

/**
 * A product's membership in a collection (2021-11).
 */
export const CollectionProduct = z.looseObject({
  collection_id: z.number().nullable().optional(),
  created_at: z.string().nullable().optional(),
  external_product_id: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional()
});
export type CollectionProduct = z.infer<typeof CollectionProduct>;

/** Envelope returned by single-collection endpoints. */
export const CollectionResponse = z.object({ collection: Collection });
export type CollectionResponse = z.infer<typeof CollectionResponse>;

/** Query parameters accepted by `GET /collections`. */
export const CollectionListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  title: z.string().optional(),
  sort_by: z.string().optional()
});
export type CollectionListParams = z.infer<typeof CollectionListParams>;

/** Query parameters accepted by `GET /collections/{id}/products`. */
export const CollectionListProductsParams = z.looseObject({
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional()
});
export type CollectionListProductsParams = z.infer<
  typeof CollectionListProductsParams
>;

/** Body for `POST /collections`. */
export const CollectionCreateBody = z.looseObject({
  title: z.string().optional(),
  description: z.string().optional(),
  body_html: z.string().optional(),
  collection_type: z.string().optional(),
  sort_order: z.string().optional(),
  template_suffix: z.string().optional()
});
export type CollectionCreateBody = z.infer<typeof CollectionCreateBody>;

/** Body for `PUT /collections/{id}`. */
export const CollectionUpdateBody = z.looseObject({
  title: z.string().optional(),
  description: z.string().optional(),
  body_html: z.string().optional(),
  collection_type: z.string().optional(),
  sort_order: z.string().optional(),
  template_suffix: z.string().optional()
});
export type CollectionUpdateBody = z.infer<typeof CollectionUpdateBody>;

/** Body for `POST /collections/{id}/products`. */
export const CollectionAddProductsBody = z.looseObject({
  collection_products: z
    .array(z.looseObject({ external_product_id: z.string().optional() }))
    .optional()
});
export type CollectionAddProductsBody = z.infer<
  typeof CollectionAddProductsBody
>;

/** Body for `DELETE /collections/{id}/products`. */
export const CollectionRemoveProductsBody = z.looseObject({
  collection_products: z
    .array(z.looseObject({ external_product_id: z.string().optional() }))
    .optional()
});
export type CollectionRemoveProductsBody = z.infer<
  typeof CollectionRemoveProductsBody
>;

/** Best-effort response for the collection product mutation endpoints. */
export const CollectionProductsResponse = z.looseObject({});
export type CollectionProductsResponse = z.infer<
  typeof CollectionProductsResponse
>;
