import * as v1 from "~/api/v1";
import * as v2 from "~/api/v2";
import RechargeClient from "~/client";

/**
 * Namespace of resources for the Recharge 2021-01 (v1) API.
 *
 * Accessed via `recharge.v1`.
 */
class RechargeV1 {
  address: v1.AddressResource;
  asyncBatch: v1.AsyncBatchResource;
  charge: v1.ChargeResource;
  checkout: v1.CheckoutResource;
  customer: v1.CustomerResource;
  discount: v1.DiscountResource;
  metafield: v1.MetafieldResource;
  notification: v1.NotificationResource;
  onetime: v1.OnetimeResource;
  order: v1.OrderResource;
  product: v1.ProductResource;
  shop: v1.ShopResource;
  subscription: v1.SubscriptionResource;
  token: v1.TokenResource;
  webhook: v1.WebhookResource;

  constructor(client: RechargeClient) {
    this.address = new v1.AddressResource(client);
    this.asyncBatch = new v1.AsyncBatchResource(client);
    this.charge = new v1.ChargeResource(client);
    this.checkout = new v1.CheckoutResource(client);
    this.customer = new v1.CustomerResource(client);
    this.discount = new v1.DiscountResource(client);
    this.metafield = new v1.MetafieldResource(client);
    this.notification = new v1.NotificationResource(client);
    this.onetime = new v1.OnetimeResource(client);
    this.order = new v1.OrderResource(client);
    this.product = new v1.ProductResource(client);
    this.shop = new v1.ShopResource(client);
    this.subscription = new v1.SubscriptionResource(client);
    this.token = new v1.TokenResource(client);
    this.webhook = new v1.WebhookResource(client);
  }
}

/**
 * Namespace of resources for the Recharge 2021-11 (v2) API.
 *
 * Accessed via `recharge.v2`.
 */
class RechargeV2 {
  account: v2.AccountResource;
  address: v2.AddressResource;
  asyncBatch: v2.AsyncBatchResource;
  bundleSelection: v2.BundleSelectionResource;
  charge: v2.ChargeResource;
  checkout: v2.CheckoutResource;
  collection: v2.CollectionResource;
  credit: v2.CreditResource;
  customer: v2.CustomerResource;
  discount: v2.DiscountResource;
  entitlement: v2.EntitlementResource;
  event: v2.EventResource;
  metafield: v2.MetafieldResource;
  notification: v2.NotificationResource;
  onetime: v2.OnetimeResource;
  order: v2.OrderResource;
  paymentMethod: v2.PaymentMethodResource;
  plan: v2.PlanResource;
  product: v2.ProductResource;
  store: v2.StoreResource;
  subscription: v2.SubscriptionResource;
  token: v2.TokenResource;
  webhook: v2.WebhookResource;

  constructor(client: RechargeClient) {
    this.account = new v2.AccountResource(client);
    this.address = new v2.AddressResource(client);
    this.asyncBatch = new v2.AsyncBatchResource(client);
    this.bundleSelection = new v2.BundleSelectionResource(client);
    this.charge = new v2.ChargeResource(client);
    this.checkout = new v2.CheckoutResource(client);
    this.collection = new v2.CollectionResource(client);
    this.credit = new v2.CreditResource(client);
    this.customer = new v2.CustomerResource(client);
    this.discount = new v2.DiscountResource(client);
    this.entitlement = new v2.EntitlementResource(client);
    this.event = new v2.EventResource(client);
    this.metafield = new v2.MetafieldResource(client);
    this.notification = new v2.NotificationResource(client);
    this.onetime = new v2.OnetimeResource(client);
    this.order = new v2.OrderResource(client);
    this.paymentMethod = new v2.PaymentMethodResource(client);
    this.plan = new v2.PlanResource(client);
    this.product = new v2.ProductResource(client);
    this.store = new v2.StoreResource(client);
    this.subscription = new v2.SubscriptionResource(client);
    this.token = new v2.TokenResource(client);
    this.webhook = new v2.WebhookResource(client);
  }
}

/**
 * Entry point for the Recharge API client.
 *
 * Exposes both API versions via {@link Recharge.v1} (2021-01) and
 * {@link Recharge.v2} (2021-11), which share a single underlying HTTP client.
 *
 * @example
 * ```typescript
 * import { Recharge } from "@chemicalluck/recharge-api-node";
 *
 * const recharge = new Recharge("your-api-key");
 * const subscriptions = await recharge.v2.subscription.list();
 * ```
 */
class Recharge {
  private client: RechargeClient;
  /** Resources for the 2021-01 API version. */
  v1: RechargeV1;
  /** Resources for the 2021-11 API version. */
  v2: RechargeV2;

  /**
   * @param apiKey - The Recharge store API token.
   * @param client - Optional pre-configured client (mainly for testing).
   */
  constructor(apiKey: string, client?: RechargeClient) {
    this.client = client ?? new RechargeClient(apiKey);
    this.v1 = new RechargeV1(this.client);
    this.v2 = new RechargeV2(this.client);
  }
}

export { Recharge };
export * from "./models";
