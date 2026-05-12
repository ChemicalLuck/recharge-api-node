# Recharge API Client for Node.js

A Node.js client for the Recharge Payments API covering both the 2021-01 and 2021-11 API versions.

[![npm package](https://img.shields.io/badge/npm%20i-@chemicalluck/recharge--api--node-brightgreen)](https://www.npmjs.com/package/chemicalluck/recharge-api-node)
[![NPM Version](https://img.shields.io/npm/v/%40chemicalluck%2Frecharge-api-node)](https://github.com/chemicalluck/recharge-api-node/releases)
[![Release & Publish](https://github.com/ChemicalLuck/recharge-api-node/actions/workflows/publish.yml/badge.svg)](https://github.com/ChemicalLuck/recharge-api-node/actions/workflows/publish.yml)
[![License](https://img.shields.io/github/license/chemicalluck/recharge-api-node)](https://github.com/chemicalluck/recharge-api-node/blob/main/LICENSE)

## Installation

```bash
npm install @chemicalLuck/recharge-api-node
```

## Usage

```typescript
import { Recharge } from "@ChemicalLuck/recharge-api-node";

const recharge = new Recharge("your-api-key");

// v1 (2021-01) API
const addresses = await recharge.v1.address.list(customerId);
const customer = await recharge.v1.customer.get(customerId);

// v2 (2021-11) API
const subscriptions = await recharge.v2.subscription.list();
const paymentMethods = await recharge.v2.paymentMethod.list();
```

## Resources

### v1 (2021-01)

| Resource       | Methods                                                                                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `address`      | `create`, `get`, `update`, `delete`, `list`, `count`, `validate`, `applyDiscount`                                                                             |
| `asyncBatch`   | `create`, `get`, `list`, `process`, `createTask`, `listTasks`                                                                                                 |
| `charge`       | `get`, `list`, `count`, `change_next_charge_date`, `skip`, `unskip`, `refund`, `process`, `capture`, `apply_discount`, `remove_discount`                      |
| `checkout`     | `create`, `get`, `update`, `get_shipping_rates`, `process`                                                                                                    |
| `customer`     | `create`, `get`, `update`, `delete`, `list`, `count`, `payment_sources`                                                                                       |
| `discount`     | `create`, `get`, `update`, `delete`, `list`, `count`, `applyToAddress`, `applyToCharge`, `remove`                                                             |
| `metafield`    | `create`, `get`, `update`, `delete`, `list`, `count`                                                                                                          |
| `notification` | `send`                                                                                                                                                        |
| `onetime`      | `create`, `get`, `update`, `delete`, `list`                                                                                                                   |
| `order`        | `get`, `update`, `delete`, `list`, `count`, `change_date`, `change_variant`, `clone`, `delay`                                                                 |
| `product`      | `create`, `get`, `update`, `delete`, `list`, `count`                                                                                                          |
| `shop`         | `get`, `shipping_countries`                                                                                                                                   |
| `subscription` | `create`, `get`, `update`, `delete`, `list`, `count`, `changeNextChargeDate`, `changeAddress`, `cancel`, `activate`, `bulkCreate`, `bulkUpdate`, `bulkDelete` |
| `token`        | `token_information`                                                                                                                                           |
| `webhook`      | `create`, `get`, `update`, `delete`, `list`, `test`                                                                                                           |

### v2 (2021-11)

| Resource          | Methods                                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `account`         | `get`, `list`                                                                                                                       |
| `address`         | `create`, `get`, `update`, `delete`, `list`, `merge`, `skipFutureCharge`                                                            |
| `asyncBatch`      | `create`, `get`, `list`, `process`, `createTask`, `listTasks`                                                                       |
| `bundleSelection` | `create`, `get`, `update`, `delete`, `list`                                                                                         |
| `charge`          | `get`, `list`, `applyDiscount`, `removeDiscount`, `skip`, `unskip`, `refund`, `process`, `capture`, `addFreeGift`, `removeFreeGift` |
| `checkout`        | `create`, `get`, `update`, `getShippingRates`, `process`                                                                            |
| `collection`      | `create`, `get`, `update`, `delete`, `list`, `listProducts`, `addProducts`, `removeProducts`                                        |
| `credit`          | `create`, `get`, `update`, `list`, `createAdjustment`, `listAdjustments`, `listAllAdjustments`                                      |
| `customer`        | `create`, `get`, `update`, `delete`, `list`, `deliverySchedule`, `creditSummary`                                                    |
| `discount`        | `create`, `get`, `update`, `delete`, `list`                                                                                         |
| `event`           | `list`                                                                                                                              |
| `metafield`       | `create`, `get`, `update`, `delete`, `list`                                                                                         |
| `notification`    | `sendEmail`                                                                                                                         |
| `onetime`         | `create`, `get`, `update`, `delete`, `list`                                                                                         |
| `order`           | `get`, `update`, `delete`, `list`, `clone`, `delay`                                                                                 |
| `paymentMethod`   | `create`, `get`, `update`, `delete`, `list`                                                                                         |
| `plan`            | `create`, `update`, `delete`, `list`, `bulkCreate`, `bulkUpdate`, `bulkDelete`                                                      |
| `product`         | `create`, `get`, `update`, `delete`, `list`                                                                                         |
| `store`           | `get`                                                                                                                               |
| `subscription`    | `create`, `get`, `update`, `delete`, `list`, `setNextChargeDate`, `changeAddress`, `cancel`, `activate`                             |
| `token`           | `get`                                                                                                                               |
| `webhook`         | `create`, `get`, `update`, `delete`, `list`, `test`                                                                                 |

## Recharge Documentation

- [Recharge API 2021-01](https://developer.rechargepayments.com/2021-01/)
- [Recharge API 2021-11](https://developer.rechargepayments.com/2021-11/)
- [Recharge Storefront Client Types](https://storefront.getrecharge.com/client/docs/types/)

## License

[MIT](LICENSE)
