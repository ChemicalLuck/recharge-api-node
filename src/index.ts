import * as v1 from "~/api/v1";
import RechargeClient from "~/client";

class RechargeV1 {
  address: v1.AddressResource;
  charge: v1.ChargeResource;
  checkout: v1.CheckoutResource;
  customer: v1.CustomerResource;
  order: v1.OrderResource;
  subscription: v1.SubscriptionResource;
  onetime: v1.OnetimeResource;
  discount: v1.DiscountResource;
  webhook: v1.WebhookResource;
  metafield: v1.MetafieldResource;
  shop: v1.ShopResource;
  product: v1.ProductResource;
  asyncBatch: v1.AsyncBatchResource;
  notification: v1.NotificationResource;
  token: v1.TokenResource;

  constructor(client: RechargeClient) {
    this.address = new v1.AddressResource(client);
    this.charge = new v1.ChargeResource(client);
    this.checkout = new v1.CheckoutResource(client);
    this.customer = new v1.CustomerResource(client);
    this.order = new v1.OrderResource(client);
    this.subscription = new v1.SubscriptionResource(client);
    this.onetime = new v1.OnetimeResource(client);
    this.discount = new v1.DiscountResource(client);
    this.webhook = new v1.WebhookResource(client);
    this.metafield = new v1.MetafieldResource(client);
    this.shop = new v1.ShopResource(client);
    this.product = new v1.ProductResource(client);
    this.asyncBatch = new v1.AsyncBatchResource(client);
    this.notification = new v1.NotificationResource(client);
    this.token = new v1.TokenResource(client);
  }
}

class Recharge {
  private client: RechargeClient;
  v1: RechargeV1;

  /**
   * Constructs a new Recharge instance.
   * @param api_key - The Recharge API key.
   * @param client - The Recharge client.
   */
  constructor(apiKey: string, client?: RechargeClient) {
    this.client = client ?? new RechargeClient(apiKey);
    this.v1 = new RechargeV1(this.client);
  }
}

export { Recharge };
export * from "./models";
