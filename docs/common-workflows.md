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

## Handling errors

`4xx` responses indicate a problem with your request and are not worth
retrying as-is. Fix the request first. `5xx` responses indicate a
problem on SELVA's side — retry these with exponential backoff.

For payment creation specifically, always retry with the same
`X-Idempotency-Key`. SELVA will return the result of the original
request rather than creating a duplicate.

See the [error reference](/docs/errors) for the full list of error
codes and their meanings.
