import { z } from "zod";

/**
 * A single item selected as part of a bundle selection (2021-11).
 */
export const BundleSelectionItem = z.looseObject({
  id: z.number(),
  collection_id: z.string().nullable().optional(),
  collection_source: z.string().nullable().optional(),
  external_product_id: z.string().nullable().optional(),
  external_variant_id: z.string().nullable().optional(),
  quantity: z.number().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional()
});
export type BundleSelectionItem = z.infer<typeof BundleSelectionItem>;

/**
 * A Recharge bundle selection (2021-11).
 *
 * @see https://developer.rechargepayments.com/2021-11/bundle_selections/bundle_selection_object
 */
export const BundleSelection = z.looseObject({
  bundle_variant: z.number().nullable().optional(),
  created_at: z.string().nullable().optional(),
  external_product_id: z.string().nullable().optional(),
  external_variant_id: z.string().nullable().optional(),
  id: z.number().nullable().optional(),
  items: z.array(BundleSelectionItem).nullable().optional(),
  purchase_item_id: z.number().nullable().optional(),
  updated_at: z.string().nullable().optional()
});
export type BundleSelection = z.infer<typeof BundleSelection>;

/** Envelope returned by single-bundle-selection endpoints. */
export const BundleSelectionResponse = z.object({
  bundle_selection: BundleSelection
});
export type BundleSelectionResponse = z.infer<typeof BundleSelectionResponse>;

/** Query parameters accepted by `GET /bundle_selections`. */
export const BundleSelectionListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  purchase_item_ids: z.string().optional(),
  sort_by: z.string().optional()
});
export type BundleSelectionListParams = z.infer<
  typeof BundleSelectionListParams
>;

/** An item in a bundle-selection create/update body. */
export const BundleSelectionItemBody = z.looseObject({
  collection_id: z.string().optional(),
  collection_source: z.string().optional(),
  external_product_id: z.string().optional(),
  external_variant_id: z.string().optional(),
  quantity: z.number().optional()
});
export type BundleSelectionItemBody = z.infer<typeof BundleSelectionItemBody>;

/** Body for `POST /bundle_selections`. */
export const BundleSelectionCreateBody = z.looseObject({
  bundle_variant_id: z.number().optional(),
  purchase_item_id: z.number().optional(),
  external_product_id: z.string().optional(),
  external_variant_id: z.string().optional(),
  items: z.array(BundleSelectionItemBody).optional()
});
export type BundleSelectionCreateBody = z.infer<
  typeof BundleSelectionCreateBody
>;

/** Body for `PUT /bundle_selections/{id}`. */
export const BundleSelectionUpdateBody = z.looseObject({
  external_product_id: z.string().optional(),
  external_variant_id: z.string().optional(),
  items: z.array(BundleSelectionItemBody).optional()
});
export type BundleSelectionUpdateBody = z.infer<
  typeof BundleSelectionUpdateBody
>;
