import { z } from "zod";

/**
 * Shared leaf sub-schemas used across multiple Recharge resources and both API
 * versions. Only fragments with an identical documented shape live here; whole
 * entities are defined per-version to keep v1/v2 divergence explicit.
 *
 * Field shapes are derived from the documented response examples. All object
 * schemas are {@link z.looseObject | loose} so unknown keys added by the API are
 * preserved rather than stripped, and fields are permissive (optional, and
 * nullable where the API is observed to return `null`) so that runtime
 * validation stays a safety net rather than a source of false warnings.
 */

/**
 * Monetary amounts. Recharge serializes most money fields as decimal strings
 * (e.g. `"10.00"`) but returns a few as numbers, so both are accepted.
 */
export const Money = z.union([z.string(), z.number()]);

/** A reference to an object in the external ecommerce platform (e.g. Shopify). */
export const ExternalId = z.looseObject({
  ecommerce: z.string().nullable().optional()
});
export type ExternalId = z.infer<typeof ExternalId>;

/** A line-item custom property (name/value pair). */
export const Property = z.looseObject({
  name: z.string().nullable().optional(),
  value: z.string().nullable().optional()
});
export type Property = z.infer<typeof Property>;

/** Order-level custom attribute (name/value pair). */
export const OrderAttribute = z.looseObject({
  name: z.string().nullable().optional(),
  value: z.string().nullable().optional()
});
export type OrderAttribute = z.infer<typeof OrderAttribute>;

/** Product image URLs at various sizes. */
export const Image = z.looseObject({
  small: z.string().nullable().optional(),
  medium: z.string().nullable().optional(),
  large: z.string().nullable().optional(),
  original: z.string().nullable().optional()
});
export type Image = z.infer<typeof Image>;

/** A single UTM tracking record. */
export const UtmParam = z.looseObject({
  utm_source: z.string().nullable().optional(),
  utm_medium: z.string().nullable().optional(),
  utm_campaign: z.string().nullable().optional(),
  utm_content: z.string().nullable().optional(),
  utm_term: z.string().nullable().optional(),
  utm_data_source: z.string().nullable().optional(),
  utm_time_stamp: z.string().nullable().optional()
});
export type UtmParam = z.infer<typeof UtmParam>;

/**
 * Marketing analytics attached to a charge/subscription. `utm_params` is
 * usually an array but is occasionally serialized as an object.
 */
export const AnalyticsData = z.looseObject({
  utm_params: z
    .union([z.array(UtmParam), z.looseObject({})])
    .nullable()
    .optional()
});
export type AnalyticsData = z.infer<typeof AnalyticsData>;

/** Client/browser details captured at checkout. */
export const ClientDetails = z.looseObject({
  browser_ip: z.string().nullable().optional(),
  user_agent: z.string().nullable().optional()
});
export type ClientDetails = z.infer<typeof ClientDetails>;

/** A tax line applied to a line item, shipping line, or charge. */
export const TaxLine = z.looseObject({
  title: z.string().nullable().optional(),
  price: Money.nullable().optional(),
  // `rate` is returned as either a number or a decimal string.
  rate: Money.nullable().optional(),
  unit_price: Money.nullable().optional()
});
export type TaxLine = z.infer<typeof TaxLine>;

/** A shipping line applied to a charge/order. */
export const ShippingLine = z.looseObject({
  code: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  price: Money.nullable().optional(),
  source: z.string().nullable().optional(),
  taxable: z.boolean().nullable().optional(),
  tax_lines: z.array(TaxLine).nullable().optional()
});
export type ShippingLine = z.infer<typeof ShippingLine>;

/** A discount summary as embedded on a charge/order. */
export const DiscountSummary = z.looseObject({
  id: z.number().nullable().optional(),
  code: z.string().nullable().optional(),
  value: Money.nullable().optional(),
  value_type: z.string().nullable().optional()
});
export type DiscountSummary = z.infer<typeof DiscountSummary>;

/** Billing/shipping address as embedded on a charge/order (a subset of the
 * standalone Address resource). Note: v1 uses `country`, v2 uses `country_code`;
 * both are accepted here. */
export const AddressSummary = z.looseObject({
  address1: z.string().nullable().optional(),
  address2: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  country_code: z.string().nullable().optional(),
  first_name: z.string().nullable().optional(),
  last_name: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  province: z.string().nullable().optional(),
  zip: z.string().nullable().optional()
});
export type AddressSummary = z.infer<typeof AddressSummary>;

/** A line item as embedded on a charge/order (2021-11 shape). */
export const LineItem = z.looseObject({
  purchase_item_id: z.number().nullable().optional(),
  purchase_item_type: z.string().nullable().optional(),
  external_product_id: ExternalId.nullable().optional(),
  external_variant_id: ExternalId.nullable().optional(),
  title: z.string().nullable().optional(),
  variant_title: z.string().nullable().optional(),
  sku: z.string().nullable().optional(),
  handle: z.string().nullable().optional(),
  quantity: z.number().nullable().optional(),
  grams: z.number().nullable().optional(),
  unit_price: Money.nullable().optional(),
  unit_price_includes_tax: z.boolean().nullable().optional(),
  original_price: Money.nullable().optional(),
  total_price: Money.nullable().optional(),
  taxable: z.boolean().nullable().optional(),
  taxable_amount: Money.nullable().optional(),
  tax_due: Money.nullable().optional(),
  offer_attributes: z.unknown().nullable().optional(),
  properties: z.array(Property).nullable().optional(),
  images: Image.nullable().optional(),
  tax_lines: z.array(TaxLine).nullable().optional()
});
export type LineItem = z.infer<typeof LineItem>;
