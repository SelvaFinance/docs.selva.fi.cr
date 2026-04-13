---
sidebar_position: 2
---

# Getting Started

Use this guide to get API access from the SELVA dashboard, make your
first request, and create your first payment.

## Before you begin

You will need:

- A SELVA account
- Dashboard access for the environment you want to use
- A bearer token issued through the dashboard

## Get API access

SELVA provisions API access through the dashboard. Once your environment
has been enabled, use the issued bearer token in the `Authorization`
header for every authenticated request:

```bash
Authorization: Bearer YOUR_ACCESS_TOKEN
```

See [Authentication](/docs/authentication) for token handling guidance.

## Make your first request

Start with `GET /api/accounts` to list the accounts available to your
integration.

```bash
curl https://{base-url}/api/accounts \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

```javascript
const response = await fetch('https://{base-url}/api/accounts', {
  headers: {
    Authorization: 'Bearer YOUR_ACCESS_TOKEN',
  },
});

const accounts = await response.json();
console.log(accounts);
```

## Check payment rail availability

Use `GET /api/payments/service-status` to confirm the payment rails are
available before initiating transfers.

```bash
curl https://{base-url}/api/payments/service-status
```

## Create your first payment

Use `POST /api/payments` to initiate a payment. Every payment request
must include a unique `X-Idempotency-Key` header so the same request can
be retried safely without double-processing.

```javascript
const idempotencyKey = crypto.randomUUID();

const response = await fetch('https://{base-url}/api/payments', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer YOUR_ACCESS_TOKEN',
    'Content-Type': 'application/json',
    'X-Idempotency-Key': idempotencyKey,
  },
  body: JSON.stringify({
    source_account_id: 'YOUR_SOURCE_ACCOUNT_ID',
    amount: 10000,
    recipient_phone: 'YOUR_RECIPIENT_PHONE',
    description: 'YOUR_DESCRIPTION',
    reference: 'YOUR_REFERENCE',
  }),
});

const payment = await response.json();
console.log(payment);
```

## Next steps

- Learn more about [Authentication](/docs/authentication)
- Explore the <a href="/api-reference" target="_blank">API Reference</a>
- Review [Common Workflows](/docs/common-workflows)
- See [Error Handling](/docs/errors)

## Support

Reach us at support@selva.fi.cr.
