---
sidebar_position: 5
---

# Common Workflows

## Processing a payment

Before submitting a payment, validate the payload with
`POST /api/payments/validate`. This returns the detected payment
channel and an estimated fee without initiating a transfer. It's worth
doing this step on every payment to surface errors early.

Once validated, create the payment with `POST /api/payments`. Always
include an `X-Idempotency-Key` header. SELVA uses it to deduplicate
requests, so if a network failure causes you to retry, you won't
process the same payment twice.

Payments are processed asynchronously. Poll `GET /api/payments/{id}` to
check the current state, or set up a webhook subscription to receive
status updates without polling.

## Managing accounts

Create an account with `POST /api/accounts`, specifying either `CRC` or
`USD` as the currency. Once created, use `GET /api/accounts` to list
accounts, `GET /api/accounts/{id}` to inspect account details, and
`GET /api/accounts/{id}/balance` to retrieve the current balance.

## Verifying a destination

Before sending a payment, you can confirm the destination is valid.
`GET /api/iban/information/{iban}` returns the account holder's name
for a given IBAN. `GET /api/phone/information/{phone}` confirms whether
a phone number is registered for SINPE Móvil and returns the holder's
name.

Doing this before creating a payment gives your users a chance to
confirm they're sending money to the right person.

## Setting up webhooks

Register a URL to receive events with
`POST /api/webhooks/subscriptions`. Subscriptions can include the
target URL, subscribed events, retry settings, timeout, and optional
headers.

Subscriptions can be suspended and resumed independently via
`POST /api/webhooks/subscriptions/{id}/suspend` and
`POST /api/webhooks/subscriptions/{id}/resume`. This lets you take an
endpoint offline temporarily without losing the subscription
configuration.

### Incoming notification payloads

SELVA sends subscribed events to your webhook URL as JSON. Every incoming
notification includes the event name, the payment or transaction data,
and the delivery timestamp.

The `fee` field is always present. For `payment.created` and
`payment.processing`, `fee` is `null`. For `payment.completed`, `fee` is
defined once the final processing cost is known.

#### payment.created

```json
{
  "event": "payment.created",
  "data": {
    "id": "4aebf342-8e69-4712-8cbc-77326bf19660",
    "idempotency_key": "f80fa916-f435-4003-a772-81b03d5c4162",
    "channel_reference": "2026041200001915461001586",
    "sinpe_reference": null,
    "channel": "pin",
    "transfer_type": "debit",
    "payer": {
      "iban": "CR41037010700577264928",
      "document_number": "3918734189",
      "document_type": 3,
      "phone_number": null,
      "name": "Alice Johnson"
    },
    "payee": {
      "iban": "CR27010400128230020117",
      "document_number": "0304930258",
      "document_type": 0,
      "phone_number": null,
      "name": "Bob Smith"
    },
    "amount": {
      "value": 10000,
      "currency": "CRC",
      "formatted": "100.00 CRC"
    },
    "fee": null,
    "description": null,
    "status": "pending",
    "created_at": "2026-04-01 00:00:00",
    "completed_at": null
  },
  "timestamp": "2026-04-01T00:00:00-06:00"
}
```

#### payment.processing

```json
{
  "event": "payment.processing",
  "data": {
    "id": "4aebf342-8e69-4712-8cbc-77326bf19660",
    "idempotency_key": "f80fa916-f435-4003-a772-81b03d5c4162",
    "channel_reference": "2026041200001915461001586",
    "sinpe_reference": null,
    "channel": "pin",
    "transfer_type": "debit",
    "payer": {
      "iban": "CR41037010700577264928",
      "document_number": "3918734189",
      "document_type": 3,
      "phone_number": null,
      "name": "Alice Johnson"
    },
    "payee": {
      "iban": "CR27010400128230020117",
      "document_number": "0304930258",
      "document_type": 0,
      "phone_number": null,
      "name": "Bob Smith"
    },
    "amount": {
      "value": 10000,
      "currency": "CRC",
      "formatted": "100.00 CRC"
    },
    "fee": null,
    "description": null,
    "status": "processing",
    "created_at": "2026-04-01 00:00:00",
    "completed_at": null
  },
  "timestamp": "2026-04-01T00:01:00-06:00"
}
```

#### payment.completed

```json
{
  "event": "payment.completed",
  "data": {
    "id": "4aebf342-8e69-4712-8cbc-77326bf19660",
    "idempotency_key": "f80fa916-f435-4003-a772-81b03d5c4162",
    "channel_reference": "2026041200001915461001586",
    "sinpe_reference": "2026041237022010000107394",
    "channel": "pin",
    "transfer_type": "debit",
    "payer": {
      "iban": "CR41037010700577264928",
      "document_number": "3918734189",
      "document_type": 3,
      "phone_number": null,
      "name": "Alice Johnson"
    },
    "payee": {
      "iban": "CR27010400128230020117",
      "document_number": "0304930258",
      "document_type": 0,
      "phone_number": null,
      "name": "Bob Smith"
    },
    "amount": {
      "value": 10000,
      "currency": "CRC",
      "formatted": "100.00 CRC"
    },
    "fee": {
      "value": 100,
      "currency": "CRC",
      "formatted": "1.00 CRC"
    },
    "description": null,
    "status": "completed",
    "created_at": "2026-04-01 00:00:00",
    "completed_at": "2026-04-01 00:02:00"
  },
  "timestamp": "2026-04-01T00:02:00-06:00"
}
```

#### payment.failed

```json
{
  "event": "payment.failed",
  "data": {
    "id": "80c530a1-4f79-485d-bc0d-5c560d8ff300",
    "idempotency_key": "6f19de2e-f9f0-4d4b-86cd-819bcfc024f2",
    "channel_reference": "2026040700001211177562391",
    "sinpe_reference": null,
    "channel": "pin",
    "transfer_type": "debit",
    "payer": {
      "iban": "CR19037010600733756399",
      "document_number": "3918734189",
      "document_type": 3,
      "phone_number": null,
      "name": "Alice Johnson"
    },
    "payee": {
      "iban": "CR09010200009097516385",
      "document_number": "0303870686",
      "document_type": 0,
      "phone_number": null,
      "name": "Bob Smith"
    },
    "amount": {
      "value": 9900,
      "currency": "CRC",
      "formatted": "99.00 CRC"
    },
    "fee": null,
    "description": null,
    "status": "failed",
    "created_at": "2026-04-01 00:03:00",
    "completed_at": null,
    "error": "Service unavailable: payment result missing from response",
    "state_code": "rejected"
  },
  "timestamp": "2026-04-01T00:04:00-06:00"
}
```

#### transaction.received for PIN

For PIN incoming transactions, the origin account is usually identified
with `payer.iban`. The origin `payer.phone_number` can be `null` when it
is not provided by the payment rail.

```json
{
  "event": "transaction.received",
  "data": {
    "id": "80c530a1-4f79-485d-bc0d-5c560d8ff300",
    "idempotency_key": "CREDIT_6f19de2e_f9f0_4d4b_86cd_819bcfc024f2",
    "channel_reference": null,
    "sinpe_reference": "2026040737022010000106803",
    "channel": "pin",
    "transfer_type": "credit",
    "payer": {
      "iban": "CR27010400128230020117",
      "document_number": "0304930258",
      "document_type": 0,
      "phone_number": null,
      "name": "Bob Smith"
    },
    "payee": {
      "iban": "CR41037010700577264928",
      "document_number": "3918734189",
      "document_type": 3,
      "phone_number": null,
      "name": "Alice Johnson"
    },
    "amount": {
      "value": 10000,
      "currency": "CRC",
      "formatted": "100.00 CRC"
    },
    "fee": null,
    "description": "Incoming PIN payment",
    "status": "completed",
    "created_at": "2026-04-01 00:05:00",
    "completed_at": "2026-04-01 00:05:00"
  },
  "timestamp": "2026-04-01T00:05:00-06:00"
}
```

#### transaction.received for SINPE Movil

For SINPE Movil incoming transactions, the origin is usually identified
with `payer.phone_number`, and `payer.iban` can be `null`. The origin
`payer.phone_number` can also be `null` when the upstream response does
not provide it.

```json
{
  "event": "transaction.received",
  "data": {
    "id": "7b200345-c922-476e-bbc4-e2a143165ca6",
    "idempotency_key": "CREDIT_f80fa916_f435_4003_a772_81b03d5c4162",
    "channel_reference": null,
    "sinpe_reference": "2026042800000000000000002",
    "channel": "sinpe_movil",
    "transfer_type": "credit",
    "payer": {
      "iban": null,
      "document_number": "0308880719",
      "document_type": null,
      "phone_number": "88881234",
      "name": "Bob Smith"
    },
    "payee": {
      "iban": "CR41037010700577264928",
      "document_number": "3918734189",
      "document_type": 3,
      "phone_number": "88880001",
      "name": "Alice Johnson"
    },
    "amount": {
      "value": 3000000,
      "currency": "CRC",
      "formatted": "30,000.00 CRC"
    },
    "fee": null,
    "description": "Incoming SINPE Movil payment",
    "status": "completed",
    "created_at": "2026-04-01 00:06:00",
    "completed_at": "2026-04-01 00:06:00"
  },
  "timestamp": "2026-04-01T00:06:00-06:00"
}
```

## Handling errors

`4xx` responses indicate a problem with your request and are not worth
retrying as-is. Fix the request first. `5xx` responses indicate a
problem on SELVA's side — retry these with exponential backoff.

For payment creation specifically, always retry with the same
`X-Idempotency-Key`. SELVA will return the result of the original
request rather than creating a duplicate.

See the [error reference](/docs/errors) for the full list of error
codes and their meanings.
