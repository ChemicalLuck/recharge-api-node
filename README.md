# Recharge API Client for Node.js
This is a Node.js client for the Recharge API. It is a wrapper around the Recharge API, which is a RESTful API that allows you to interact with your Recharge account programmatically.

[![npm package](https://img.shields.io/badge/npm%20i-example--typescript--package-brightgreen)](https://www.npmjs.com/package/chemicalluck/recharge-api-node)
[![version number](https://img.shields.io/npm/v/example-typescript-package?color=green&label=version)](https://github.com/chemicalluck/recharge-api-node/releases)
[![Release & Publish](https://github.com/ChemicalLuck/recharge-api-node/actions/workflows/publish.yml/badge.svg)](https://github.com/ChemicalLuck/recharge-api-node/actions/workflows/publish.yml)
[![License](https://img.shields.io/github/license/chemicalluck/recharge-api-node)](https://github.com/chemicalluck/recharge-api-node/blob/main/LICENSE)

## Installation
To install the Recharge API client, run the following command:

```bash
npm install @ChemicalLuck/recharge-api-node
```

## Usage
To use the Recharge API client, you will need to create a new instance of the `Recharge` class and pass in your Recharge API key. You can then use the methods provided by the client to interact with the Recharge API.
```typescript
import { Recharge } from '@ChemicalLuck/recharge-api-node';

const recharge = new Recharge('your-api-key');

const customer_id = 12345;
const addresses = await recharge.v1.address.list(customer_id);

console.log(addresses);
```

For more details on the content of the reponses, visit the [official recharge API docs](https://developer.rechargepayments.com).

## Resources Available
### v1(2021-01)
- [x] Address
- [ ]Charge
- [ ]Checkout
- [ ]Customer
- [ ]Discount
- [ ]Metafield
- [ ]Notification
- [ ]Onetime
- [ ]Order
- [ ]Product
- [ ]Shop
- [ ]Subscription
- [ ]Webhook
- [ ]Async Batch
### v2(2021-11)
- [ ]Address
- [ ]BundleSelection
- [ ]Charge
- [ ]Checkout
- [ ]Collection
- [ ]Customer
- [ ]Discount
- [ ]Metafield
- [ ]Notification
- [ ]Onetime
- [ ]Order
- [ ]Payment Method
- [ ]Plan
- [ ]Retention Strategy
- [ ]Subscription
- [ ]Webhook
- [ ]Async Batch
- [ ]Token
- [ ]Account
- [ ]Event
- [ ]Store

# Recharge Documentation

- [Recharge API 2021-01](https://developer.rechargepayments.com/2021-01/)
- [Recharge API 2021-11](https://developer.rechargepayments.com/2021-11/)
- [Recharge API Webhook Examples 2021-01](https://docs.getrecharge.com/docs/webhook-payload-examples)
- [Recharge API Webhook Examples 2021-11](https://docs.getrecharge.com/docs/webhooks-examples-2021-11)

## License

[MIT](LICENSE)
