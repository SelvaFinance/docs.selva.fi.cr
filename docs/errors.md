---
sidebar_position: 6
---

# Error Handling

## Response format

All errors return the same structure:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "data": null,
  "errors": {
    "field": ["Additional error details"]
  }
}
```

The `message` field is intended for logging and debugging. The `errors`
object contains field-level detail when a request fails validation —
map these directly to your form fields to show users what needs fixing.

## Validation errors

Endpoints that create or modify resources return field-level errors on
`422`. Each key in `errors` corresponds to a field in your request:

```json
{
  "success": false,
  "message": "Request validation failed",
  "data": null,
  "errors": {
    "amount": ["Amount must be greater than 0"],
    "currency": ["Invalid currency code"],
    "recipient_identifier": ["Invalid account identifier format"]
  }
}
```

## Webhooks

Return a `200` immediately on receipt, even if your processing fails.
Selva uses the response code to determine whether to retry delivery —
if you return anything other than `2xx`, the event will be queued for
redelivery. Handle failures asynchronously after acknowledging receipt.

Verify the signature on every incoming request before processing it.
Selva signs the payload using the secret configured on the subscription.
