---
sidebar_position: 5
---

# Common Workflows

## Processing a payment

Before submitting a payment, validate the payload with
`POST /payments/validate`. This returns the detected payment type, an
estimated fee, and whether the target rail is currently available —
without initiating a transfer. It's worth doing this step on every
payment to surface errors early.

Once validated, create the payment with `POST /payments`. Always include
an `X-Idempotency-Key` header — Selva uses it to deduplicate requests,
so if a network failure causes you to retry, you won't process the same
payment twice.

Payments are processed asynchronously. Poll `GET /payments/{id}` to
check the current state, or set up a webhook subscription to receive
status updates without polling.

## Managing accounts

Create an account with `POST /accounts`, specifying either `CRC` or
`USD` as the currency. Once created, use `GET /accounts/{id}/balance`
to retrieve the current balance and `GET /accounts/{id}/movements` to
page through the transaction history. Individual movements can be
inspected at `GET /accounts/{id}/movements/{movementId}`.

## Verifying a destination

Before sending a payment, you can confirm the destination is valid.
`GET /iban/information/{iban}` returns the account holder's name for a
given IBAN. `GET /phone/information/{phone}` confirms whether a phone
number is registered for SINPE Móvil and returns the holder's name.

Doing this before creating a payment gives your users a chance to
confirm they're sending money to the right person.

## Setting up webhooks

Register a URL to receive events with `POST /webhooks/subscriptions`.
Each subscription accepts a signing secret — Selva signs every outgoing
payload with it so you can verify the request came from Selva and
wasn't tampered with.

Subscriptions can be suspended and resumed independently via
`POST /webhooks/subscriptions/{id}/suspend` and
`POST /webhooks/subscriptions/{id}/resume`. This lets you take an
endpoint offline temporarily without losing the subscription
configuration.

## Handling errors

`4xx` responses indicate a problem with your request and are not worth
retrying as-is. Fix the request first. `5xx` responses indicate a
problem on Selva's side — retry these with exponential backoff.

For payment creation specifically, always retry with the same
`X-Idempotency-Key`. Selva will return the result of the original
request rather than creating a duplicate.

See the [error reference](/docs/errors) for the full list of error
codes and their meanings.
