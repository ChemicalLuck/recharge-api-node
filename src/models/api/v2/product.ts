import { z } from "zod";
import { Money, Image } from "~/models/api/common";

/**
 * A product image (2021-11) — the common {@link Image} sizes plus a
 * `sort_order`.
 */
export const ProductImage = z.looseObject({
  large: z.string().nullable().optional(),
  medium: z.string().nullable().optional(),
  original: z.string().nullable().optional(),
  small: z.string().nullable().optional(),
  sort_order: z.number().nullable().optional()
});
export type ProductImage = z.infer<typeof ProductImage>;

/**
 * A variant of a store product (2021-11).
 */
export const ProductVariant = z.looseObject({
  dimensions: z
    .looseObject({
      weight: z.number().nullable().optional(),
      weight_unit: z.string().nullable().optional()
    })
    .nullable()
    .optional(),
  external_variant_id: z.string().nullable().optional(),
  image: Image.nullable().optional(),
  option_values: z
    .array(z.looseObject({ label: z.string().nullable().optional() }))
    .nullable()
    .optional(),
  prices: z
    .looseObject({
      compare_at_price: Money.nullable().optional(),
      unit_price: Money.nullable().optional()
    })
    .nullable()
    .optional(),
  requires_shipping: z.boolean().nullable().optional(),
  sku: z.string().nullable().optional(),
  tax_code: z.string().nullable().optional(),
  taxable: z.boolean().nullable().optional(),
  title: z.string().nullable().optional()
});
export type ProductVariant = z.infer<typeof ProductVariant>;

/**
 * A product option (e.g. "Size", "Color") on a store product (2021-11).
 */
export const ProductOption = z.looseObject({
  name: z.string().nullable().optional(),
  position: z.number().nullable().optional(),
  values: z
    .array(
      z.looseObject({
        label: z.string().nullable().optional(),
        position: z.number().nullable().optional()
      })
    )
    .nullable()
    .optional()
});
export type ProductOption = z.infer<typeof ProductOption>;

/**
 * A Recharge store product (2021-11).
 *
 * @see https://developer.rechargepayments.com/2021-11/products/product_object
 */
export const Product = z.looseObject({
  brand: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  external_created_at: z.string().nullable().optional(),
  external_product_id: z.string().nullable().optional(),
  external_updated_at: z.string().nullable().optional(),
  images: z.array(ProductImage).nullable().optional(),
  options: z.array(ProductOption).nullable().optional(),
  published_at: z.string().nullable().optional(),
  requires_shipping: z.boolean().nullable().optional(),
  title: z.string().nullable().optional(),
  variants: z.array(ProductVariant).nullable().optional(),
  vendor: z.string().nullable().optional()
});
export type Product = z.infer<typeof Product>;

/** Envelope returned by single-product endpoints. */
export const ProductResponse = z.object({ product: Product });
export type ProductResponse = z.infer<typeof ProductResponse>;

/** Query parameters accepted by `GET /products`. */
export const ProductListParams = z.looseObject({
  ids: z.string().optional(),
  limit: z.string().optional(),
  page: z.string().optional(),
  cursor: z.string().optional(),
  external_product_id: z.string().optional(),
  sort_by: z.string().optional(),
  updated_at_min: z.string().optional(),
  updated_at_max: z.string().optional(),
  created_at_min: z.string().optional(),
  created_at_max: z.string().optional()
});
export type ProductListParams = z.infer<typeof ProductListParams>;

/** Body for `POST /products`. */
export const ProductCreateBody = z.looseObject({
  external_product_id: z.string().optional(),
  title: z.string().optional(),
  brand: z.string().optional(),
  requires_shipping: z.boolean().optional()
});
export type ProductCreateBody = z.infer<typeof ProductCreateBody>;

/** Body for `PUT /products/{id}`. */
export const ProductUpdateBody = z.looseObject({
  title: z.string().optional(),
  brand: z.string().optional(),
  requires_shipping: z.boolean().optional()
});
export type ProductUpdateBody = z.infer<typeof ProductUpdateBody>;
