import { describe, it, expect, vi, beforeEach } from "vitest";
import { Recharge } from "~/index";
import type RechargeClient from "~/client";

const B = "https://api.rechargeapps.com";

interface Call {
  fn: "get" | "post" | "put" | "delete" | "paginate";
  url: string;
  version: string;
  key?: string;
  body?: unknown;
}

let calls: Call[];
let recharge: Recharge;

function makeClient(): RechargeClient {
  return {
    get: vi.fn((url: string, version: string) => {
      calls.push({ fn: "get", url, version });
      return Promise.resolve({});
    }),
    post: vi.fn((url: string, version: string, body?: unknown) => {
      calls.push({ fn: "post", url, version, body });
      return Promise.resolve({});
    }),
    put: vi.fn((url: string, version: string, body?: unknown) => {
      calls.push({ fn: "put", url, version, body });
      return Promise.resolve({});
    }),
    delete: vi.fn((url: string, version: string, body?: unknown) => {
      calls.push({ fn: "delete", url, version, body });
      return Promise.resolve({});
    }),
    paginate: vi.fn((url: string, version: string, key: string) => {
      calls.push({ fn: "paginate", url, version, key });
      return Promise.resolve([]);
    })
  } as unknown as RechargeClient;
}

beforeEach(() => {
  calls = [];
  recharge = new Recharge("test-token", makeClient());
});

type Expectation = [
  label: string,
  invoke: () => Promise<unknown>,
  fn: Call["fn"],
  url: string,
  key?: string
];

function run(cases: Expectation[]) {
  for (const [label, invoke, fn, url, key] of cases) {
    it(label, async () => {
      calls = [];
      await invoke();
      expect(calls).toHaveLength(1);
      const call = calls[0];
      expect(call.fn).toBe(fn);
      expect(call.url).toBe(url);
      expect(call.version).toBe("2021-11");
      if (key !== undefined) {
        expect(call.key).toBe(key);
      }
    });
  }
}

describe("v2 account", () =>
  run([
    ["get", () => recharge.v2.account.get(1), "get", `${B}/accounts/1`],
    [
      "list",
      () => recharge.v2.account.list(),
      "paginate",
      `${B}/accounts`,
      "accounts"
    ]
  ]));

describe("v2 address", () =>
  run([
    ["create", () => recharge.v2.address.create({}), "post", `${B}/addresses`],
    ["get", () => recharge.v2.address.get(1), "get", `${B}/addresses/1`],
    [
      "update",
      () => recharge.v2.address.update(1, {}),
      "put",
      `${B}/addresses/1`
    ],
    [
      "delete",
      () => recharge.v2.address.delete(1),
      "delete",
      `${B}/addresses/1`
    ],
    [
      "list",
      () => recharge.v2.address.list(),
      "paginate",
      `${B}/addresses`,
      "addresses"
    ],
    [
      "merge",
      () => recharge.v2.address.merge({}),
      "post",
      `${B}/addresses/merge`
    ],
    [
      "skipFutureCharge",
      () => recharge.v2.address.skipFutureCharge(1, {}),
      "post",
      `${B}/addresses/1/charges/skip`
    ]
  ]));

describe("v2 asyncBatch (path fix: async_batches)", () =>
  run([
    [
      "create",
      () => recharge.v2.asyncBatch.create({}),
      "post",
      `${B}/async_batches`
    ],
    ["get", () => recharge.v2.asyncBatch.get(1), "get", `${B}/async_batches/1`],
    [
      "list",
      () => recharge.v2.asyncBatch.list(),
      "paginate",
      `${B}/async_batches`,
      "async_batches"
    ],
    [
      "process",
      () => recharge.v2.asyncBatch.process(1),
      "post",
      `${B}/async_batches/1/process`
    ],
    [
      "createTask",
      () => recharge.v2.asyncBatch.createTask(1, {}),
      "post",
      `${B}/async_batches/1/tasks`
    ],
    [
      "listTasks",
      () => recharge.v2.asyncBatch.listTasks(1),
      "paginate",
      `${B}/async_batches/1/tasks`,
      "tasks"
    ]
  ]));

describe("v2 bundleSelection", () =>
  run([
    [
      "create",
      () => recharge.v2.bundleSelection.create({}),
      "post",
      `${B}/bundle_selections`
    ],
    [
      "get",
      () => recharge.v2.bundleSelection.get(1),
      "get",
      `${B}/bundle_selections/1`
    ],
    [
      "update",
      () => recharge.v2.bundleSelection.update(1, {}),
      "put",
      `${B}/bundle_selections/1`
    ],
    [
      "delete",
      () => recharge.v2.bundleSelection.delete(1),
      "delete",
      `${B}/bundle_selections/1`
    ],
    [
      "list",
      () => recharge.v2.bundleSelection.list(),
      "paginate",
      `${B}/bundle_selections`,
      "bundle_selections"
    ]
  ]));

describe("v2 charge", () =>
  run([
    ["get", () => recharge.v2.charge.get(1), "get", `${B}/charges/1`],
    [
      "list",
      () => recharge.v2.charge.list(),
      "paginate",
      `${B}/charges`,
      "charges"
    ],
    [
      "applyDiscount",
      () => recharge.v2.charge.applyDiscount(1, {}),
      "post",
      `${B}/charges/1/apply_discount`
    ],
    [
      "removeDiscount",
      () => recharge.v2.charge.removeDiscount(1),
      "post",
      `${B}/charges/1/remove_discount`
    ],
    [
      "skip",
      () => recharge.v2.charge.skip(1, {}),
      "post",
      `${B}/charges/1/skip`
    ],
    [
      "unskip",
      () => recharge.v2.charge.unskip(1, {}),
      "post",
      `${B}/charges/1/unskip`
    ],
    [
      "refund",
      () => recharge.v2.charge.refund(1, {}),
      "post",
      `${B}/charges/1/refund`
    ],
    [
      "process",
      () => recharge.v2.charge.process(1),
      "post",
      `${B}/charges/1/process`
    ],
    [
      "capture",
      () => recharge.v2.charge.capture(1),
      "post",
      `${B}/charges/1/capture_payment`
    ],
    [
      "addFreeGift",
      () => recharge.v2.charge.addFreeGift(1, {}),
      "post",
      `${B}/charges/1/add_free_gift`
    ],
    [
      "removeFreeGift",
      () => recharge.v2.charge.removeFreeGift(1, {}),
      "post",
      `${B}/charges/1/remove_free_gift`
    ]
  ]));

describe("v2 checkout", () =>
  run([
    ["create", () => recharge.v2.checkout.create({}), "post", `${B}/checkouts`],
    ["get", () => recharge.v2.checkout.get("tok"), "get", `${B}/checkouts/tok`],
    [
      "update",
      () => recharge.v2.checkout.update("tok", {}),
      "put",
      `${B}/checkouts/tok`
    ],
    [
      "getShippingRates",
      () => recharge.v2.checkout.getShippingRates("tok"),
      "get",
      `${B}/checkouts/tok/shipping_rates`
    ],
    [
      "process",
      () => recharge.v2.checkout.process("tok", {}),
      "post",
      `${B}/checkouts/tok/process`
    ]
  ]));

describe("v2 collection", () =>
  run([
    [
      "create",
      () => recharge.v2.collection.create({}),
      "post",
      `${B}/collections`
    ],
    ["get", () => recharge.v2.collection.get(1), "get", `${B}/collections/1`],
    [
      "update",
      () => recharge.v2.collection.update(1, {}),
      "put",
      `${B}/collections/1`
    ],
    [
      "delete",
      () => recharge.v2.collection.delete(1),
      "delete",
      `${B}/collections/1`
    ],
    [
      "list",
      () => recharge.v2.collection.list(),
      "paginate",
      `${B}/collections`,
      "collections"
    ],
    [
      "listProducts",
      () => recharge.v2.collection.listProducts(1),
      "paginate",
      `${B}/collections/1/products`,
      "products"
    ],
    [
      "addProducts",
      () => recharge.v2.collection.addProducts(1, {}),
      "post",
      `${B}/collections/1/products`
    ],
    [
      "removeProducts",
      () => recharge.v2.collection.removeProducts(1, {}),
      "delete",
      `${B}/collections/1/products`
    ]
  ]));

describe("v2 credit", () =>
  run([
    [
      "create",
      () => recharge.v2.credit.create({}),
      "post",
      `${B}/credit_accounts`
    ],
    ["get", () => recharge.v2.credit.get(1), "get", `${B}/credit_accounts/1`],
    [
      "update",
      () => recharge.v2.credit.update(1, {}),
      "put",
      `${B}/credit_accounts/1`
    ],
    [
      "list",
      () => recharge.v2.credit.list(),
      "paginate",
      `${B}/credit_accounts`,
      "credit_accounts"
    ],
    [
      "createAdjustment",
      () => recharge.v2.credit.createAdjustment(1, {}),
      "post",
      `${B}/credit_accounts/1/credit_adjustments`
    ],
    [
      "listAdjustments",
      () => recharge.v2.credit.listAdjustments(1),
      "paginate",
      `${B}/credit_accounts/1/credit_adjustments`,
      "credit_adjustments"
    ],
    [
      "listAllAdjustments",
      () => recharge.v2.credit.listAllAdjustments(),
      "paginate",
      `${B}/credit_adjustments`,
      "credit_adjustments"
    ]
  ]));

describe("v2 customer", () =>
  run([
    ["create", () => recharge.v2.customer.create({}), "post", `${B}/customers`],
    ["get", () => recharge.v2.customer.get(1), "get", `${B}/customers/1`],
    [
      "update",
      () => recharge.v2.customer.update(1, {}),
      "put",
      `${B}/customers/1`
    ],
    [
      "delete",
      () => recharge.v2.customer.delete(1),
      "delete",
      `${B}/customers/1`
    ],
    [
      "list",
      () => recharge.v2.customer.list(),
      "paginate",
      `${B}/customers`,
      "customers"
    ],
    [
      "deliverySchedule",
      () => recharge.v2.customer.deliverySchedule(1),
      "get",
      `${B}/customers/1/delivery_schedule`
    ],
    [
      "creditSummary",
      () => recharge.v2.customer.creditSummary(1),
      "get",
      `${B}/customers/1/credit_summary`
    ]
  ]));

describe("v2 discount", () =>
  run([
    ["create", () => recharge.v2.discount.create({}), "post", `${B}/discounts`],
    ["get", () => recharge.v2.discount.get(1), "get", `${B}/discounts/1`],
    [
      "update",
      () => recharge.v2.discount.update(1, {}),
      "put",
      `${B}/discounts/1`
    ],
    [
      "delete",
      () => recharge.v2.discount.delete(1),
      "delete",
      `${B}/discounts/1`
    ],
    [
      "list",
      () => recharge.v2.discount.list(),
      "paginate",
      `${B}/discounts`,
      "discounts"
    ]
  ]));

describe("v2 entitlement (new resource)", () =>
  run([
    [
      "create",
      () => recharge.v2.entitlement.create({}),
      "post",
      `${B}/entitlements`
    ],
    [
      "update",
      () => recharge.v2.entitlement.update(1, {}),
      "put",
      `${B}/entitlements/1`
    ],
    [
      "delete",
      () => recharge.v2.entitlement.delete(1),
      "delete",
      `${B}/entitlements/1`
    ],
    [
      "list",
      () => recharge.v2.entitlement.list(),
      "paginate",
      `${B}/entitlements`,
      "entitlements"
    ]
  ]));

describe("v2 event", () =>
  run([
    [
      "list",
      () => recharge.v2.event.list(),
      "paginate",
      `${B}/events`,
      "events"
    ]
  ]));

describe("v2 metafield", () =>
  run([
    [
      "create",
      () => recharge.v2.metafield.create({}),
      "post",
      `${B}/metafields`
    ],
    ["get", () => recharge.v2.metafield.get(1), "get", `${B}/metafields/1`],
    [
      "update",
      () => recharge.v2.metafield.update(1, {}),
      "put",
      `${B}/metafields/1`
    ],
    [
      "delete",
      () => recharge.v2.metafield.delete(1),
      "delete",
      `${B}/metafields/1`
    ],
    [
      "list",
      () => recharge.v2.metafield.list(),
      "paginate",
      `${B}/metafields`,
      "metafields"
    ]
  ]));

describe("v2 notification (path fix: /notifications)", () =>
  run([
    [
      "sendEmail",
      () => recharge.v2.notification.sendEmail({}),
      "post",
      `${B}/notifications`
    ]
  ]));

describe("v2 onetime", () =>
  run([
    ["create", () => recharge.v2.onetime.create({}), "post", `${B}/onetimes`],
    ["get", () => recharge.v2.onetime.get(1), "get", `${B}/onetimes/1`],
    [
      "update",
      () => recharge.v2.onetime.update(1, {}),
      "put",
      `${B}/onetimes/1`
    ],
    [
      "delete",
      () => recharge.v2.onetime.delete(1),
      "delete",
      `${B}/onetimes/1`
    ],
    [
      "list",
      () => recharge.v2.onetime.list(),
      "paginate",
      `${B}/onetimes`,
      "onetimes"
    ]
  ]));

describe("v2 order", () =>
  run([
    ["get", () => recharge.v2.order.get(1), "get", `${B}/orders/1`],
    ["update", () => recharge.v2.order.update(1, {}), "put", `${B}/orders/1`],
    ["delete", () => recharge.v2.order.delete(1), "delete", `${B}/orders/1`],
    [
      "list",
      () => recharge.v2.order.list(),
      "paginate",
      `${B}/orders`,
      "orders"
    ],
    [
      "clone",
      () => recharge.v2.order.clone(1, {}),
      "post",
      `${B}/orders/1/clone`
    ],
    [
      "delay",
      () => recharge.v2.order.delay(1, {}),
      "post",
      `${B}/orders/1/delay`
    ]
  ]));

describe("v2 paymentMethod", () =>
  run([
    [
      "create",
      () => recharge.v2.paymentMethod.create({}),
      "post",
      `${B}/payment_methods`
    ],
    [
      "get",
      () => recharge.v2.paymentMethod.get(1),
      "get",
      `${B}/payment_methods/1`
    ],
    [
      "update",
      () => recharge.v2.paymentMethod.update(1, {}),
      "put",
      `${B}/payment_methods/1`
    ],
    [
      "delete",
      () => recharge.v2.paymentMethod.delete(1),
      "delete",
      `${B}/payment_methods/1`
    ],
    [
      "list",
      () => recharge.v2.paymentMethod.list(),
      "paginate",
      `${B}/payment_methods`,
      "payment_methods"
    ]
  ]));

describe("v2 plan", () =>
  run([
    ["create", () => recharge.v2.plan.create({}), "post", `${B}/plans`],
    ["update", () => recharge.v2.plan.update(1, {}), "put", `${B}/plans/1`],
    ["delete", () => recharge.v2.plan.delete(1), "delete", `${B}/plans/1`],
    ["list", () => recharge.v2.plan.list(), "paginate", `${B}/plans`, "plans"],
    [
      "bulkCreate",
      () => recharge.v2.plan.bulkCreate({}),
      "post",
      `${B}/plans/bulk`
    ],
    [
      "bulkUpdate",
      () => recharge.v2.plan.bulkUpdate({}),
      "put",
      `${B}/plans/bulk`
    ],
    [
      "bulkDelete",
      () => recharge.v2.plan.bulkDelete({}),
      "delete",
      `${B}/plans/bulk`
    ]
  ]));

describe("v2 product", () =>
  run([
    ["create", () => recharge.v2.product.create({}), "post", `${B}/products`],
    ["get", () => recharge.v2.product.get(1), "get", `${B}/products/1`],
    [
      "update",
      () => recharge.v2.product.update(1, {}),
      "put",
      `${B}/products/1`
    ],
    [
      "delete",
      () => recharge.v2.product.delete(1),
      "delete",
      `${B}/products/1`
    ],
    [
      "list",
      () => recharge.v2.product.list(),
      "paginate",
      `${B}/products`,
      "products"
    ]
  ]));

describe("v2 store", () =>
  run([["get", () => recharge.v2.store.get(), "get", `${B}/store`]]));

describe("v2 subscription", () =>
  run([
    [
      "create",
      () => recharge.v2.subscription.create({}),
      "post",
      `${B}/subscriptions`
    ],
    [
      "get",
      () => recharge.v2.subscription.get(1),
      "get",
      `${B}/subscriptions/1`
    ],
    [
      "update",
      () => recharge.v2.subscription.update(1, {}),
      "put",
      `${B}/subscriptions/1`
    ],
    [
      "delete",
      () => recharge.v2.subscription.delete(1),
      "delete",
      `${B}/subscriptions/1`
    ],
    [
      "list",
      () => recharge.v2.subscription.list(),
      "paginate",
      `${B}/subscriptions`,
      "subscriptions"
    ],
    [
      "setNextChargeDate",
      () => recharge.v2.subscription.setNextChargeDate(1, {}),
      "post",
      `${B}/subscriptions/1/set_next_charge_date`
    ],
    [
      "changeAddress",
      () => recharge.v2.subscription.changeAddress(1, {}),
      "post",
      `${B}/subscriptions/1/change_address`
    ],
    [
      "cancel",
      () => recharge.v2.subscription.cancel(1, {}),
      "post",
      `${B}/subscriptions/1/cancel`
    ],
    [
      "activate",
      () => recharge.v2.subscription.activate(1),
      "post",
      `${B}/subscriptions/1/activate`
    ],
    [
      "gift (new)",
      () => recharge.v2.subscription.gift(1, {}),
      "post",
      `${B}/subscriptions/1/gift`
    ]
  ]));

describe("v2 token (path fix: /token_information)", () =>
  run([
    ["get", () => recharge.v2.token.get(), "get", `${B}/token_information`]
  ]));

describe("v2 webhook", () =>
  run([
    ["create", () => recharge.v2.webhook.create({}), "post", `${B}/webhooks`],
    ["get", () => recharge.v2.webhook.get(1), "get", `${B}/webhooks/1`],
    [
      "update",
      () => recharge.v2.webhook.update(1, {}),
      "put",
      `${B}/webhooks/1`
    ],
    [
      "delete",
      () => recharge.v2.webhook.delete(1),
      "delete",
      `${B}/webhooks/1`
    ],
    [
      "list",
      () => recharge.v2.webhook.list(),
      "paginate",
      `${B}/webhooks`,
      "webhooks"
    ],
    [
      "test",
      () => recharge.v2.webhook.test(1, {}),
      "post",
      `${B}/webhooks/1/test`
    ]
  ]));

describe("v1 sanity (correct paths, 2021-01 version)", () => {
  it("token uses /token_information at v1", async () => {
    calls = [];
    await recharge.v1.token.token_information();
    expect(calls[0]).toMatchObject({
      fn: "get",
      url: `${B}/token_information`,
      version: "2021-01"
    });
  });
  it("asyncBatch uses /async_batches at v1", async () => {
    calls = [];
    await recharge.v1.asyncBatch.list();
    expect(calls[0]).toMatchObject({
      fn: "paginate",
      url: `${B}/async_batches`,
      version: "2021-01"
    });
  });
  it("subscription bulkDelete issues DELETE /subscriptions/bulk_delete", async () => {
    calls = [];
    await recharge.v1.subscription.bulkDelete({});
    expect(calls[0]).toMatchObject({
      fn: "delete",
      url: `${B}/subscriptions/bulk_delete`
    });
  });
});
