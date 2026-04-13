---
sidebar_position: 1
---

# The SELVA API

The SELVA API is organized around REST. It accepts JSON request bodies,
returns JSON responses, and uses standard HTTP status codes and verbs.

All requests must be made over HTTPS to one of these base URLs:

- **Staging** — [https://staging.selva.fi.cr/api](https://staging.SELVA.fi.cr/api)
- **Production** — [https://app.selva.fi.cr/api](https://app.SELVA.fi.cr/api)

## Authentication

SELVA manages API access through the dashboard. Every request must
include a valid access token in the `Authorization` header:

```
Authorization: Bearer <token>
```

Provision access in the SELVA dashboard, then use the issued bearer
token in your requests.

## Payments

Payments in SELVA move money via two rails: **PIN** (identified by an
IBAN) and **SINPE Móvil** (identified by a phone number). Before
submitting a payment, you can validate its payload with
`POST /payments/validate` to catch errors early without initiating a
transfer.

When creating a payment, pass an `X-Idempotency-Key` header to safely
retry requests without risk of double-processing. SELVA uses this key
to return the result of the original request if the same key is seen
again.

Use `GET /payments/service-status` to check whether the payment rails
are currently operational before submitting.

## Accounts

Accounts hold balances in either **CRC** or **USD**. Each account has a
history of movements — individual credit and debit entries — that you
can paginate through and inspect individually.

## Verification

Before initiating a payment, you can verify the destination. Use
`GET /phone/information` to confirm that a phone number is registered
for SINPE Móvil, and `GET /iban/information` to validate an IBAN and
retrieve the account holder's name.

## Webhooks

SELVA delivers real-time events to your server for payment and account
activity. Each webhook subscription can have its own signing secret,
which SELVA uses to sign the payload so you can verify its authenticity
on receipt.

Subscriptions can be suspended and resumed independently — useful for
taking a specific endpoint offline without deleting the subscription.

## Errors

The API uses conventional HTTP response codes. `2xx` indicates success.
`4xx` indicates a problem with the request — invalid parameters, missing
fields, or a failed business rule. `5xx` indicates a problem on SELVA's
side.

Error responses include a machine-readable `code` field and a
human-readable `message`. See the [error reference](/docs/errors) for
the full list of error codes.

## Support

Reach us at support@selva.fi.cr.
