---
sidebar_position: 5
---

# Common Workflows

This guide covers common integration patterns and workflows for the Selva API.

## Workflow 1: Payment Processing

Complete flow for processing a payment from validation to completion.

### Step 1: Validate Payment

Use `POST /api/payments/validate` to pre-check payloads and return payment type, fee estimate, and service availability. See [Validate Payment](/api-reference#tag/payments/post/api/payments/validate).

### Step 2: Create Payment

Send payments with idempotency protection via `POST /api/payments` (requires `X-Idempotency-Key` header). See [Create Payment](/api-reference#tag/payments/post/api/payments).

### Step 3: Poll for Status

Retrieve current state with `GET /api/payments/{paymentId}`. For history listings, use `GET /api/payments/history`. See [Payment Status](/api-reference#tag/payments/get/api/payments/%7Bid%7D) and [Payment History](/api-reference#tag/payments/get/api/payments/history).

## Workflow 2: Account Management

Complete flow for managing accounts and viewing transactions.

### Create Account

`POST /api/accounts` (scope: `manage-accounts`). See [Create Account](/api-reference#tag/accounts/post/api/accounts).

### Get Account Balance

`GET /api/accounts/{id}/balance` (scope: `read-accounts`). See [Account Balance](/api-reference#tag/accounts/get/api/accounts/%7Bid%7D/balance).

### View Account Movements

`GET /api/accounts/{id}/transfers` with date filters (scope: `read-accounts`). For a specific transfer use `GET /api/accounts/{id}/transfers/{transferId}`. See [Account Transfers](/api-reference#tag/accounts/get/api/accounts/%7Bid%7D/transfers) and [Transfer Detail](/api-reference#tag/accounts/get/api/accounts/%7Bid%7D/transfers/%7BtransferId%7D).

## Workflow 3: Webhook Integration

Set up webhooks to receive real-time notifications.

### Step 1: Create Webhook Subscription

`POST /api/webhooks/subscriptions` to register a URL, events, secret, retry policy, and headers. See [Create Webhook Subscription](/api-reference#tag/webhooks/post/api/webhooks/subscriptions).

### Step 2: Manage and Inspect Subscriptions

`GET /api/webhooks/subscriptions` (list), `GET /api/webhooks/subscriptions/{id}` (details), `DELETE /api/webhooks/subscriptions/{id}` (delete), `POST /api/webhooks/subscriptions/{id}/suspend|resume` (delivery controls). See [List Subscriptions](/api-reference#tag/webhooks/get/api/webhooks/subscriptions), [Subscription Detail](/api-reference#tag/webhooks/get/api/webhooks/subscriptions/%7Bid%7D), [Delete Subscription](/api-reference#tag/webhooks/delete/api/webhooks/subscriptions/%7Bid%7D), [Suspend](/api-reference#tag/webhooks/post/api/webhooks/subscriptions/%7Bid%7D/suspend), and [Resume](/api-reference#tag/webhooks/post/api/webhooks/subscriptions/%7Bid%7D/resume).

### Step 3: Handle Incoming Events

Implement your `/webhooks` endpoint to verify signatures and process events published from the subscription. See [Webhook Event Payloads](/api-reference#tag/webhooks) and **Notify Incoming Transfers** for Kindo/Prosoft notifications.

## Workflow 4: Verification Services

Verify account information before processing payments.

### Verify IBAN

`GET /api/iban/information` to retrieve holder data and normalize IBANs. See [IBAN Information](/api-reference#tag/verification/get/api/iban/information).

### Verify Phone Number

`GET /api/phone/information` (SINPE lookup) to confirm ownership and registration. See [Phone Information](/api-reference#tag/verification/get/api/phone/information).

## Workflow 5: Error Handling and Retries

Implement robust error handling with exponential backoff. Use idempotency for payments, treat 4xx as non-retriable, and back off on 5xx. See [Error Handling](/api-reference#error-handling) for status codes and formats, and [Create Payment](/api-reference#tag/payments/post/api/payments) for idempotency behavior.

## Best Practices

1. **Always validate payments** before creating them
2. **Use idempotency keys** for payment requests
3. **Implement webhook signature verification** for security
4. **Handle rate limits** with exponential backoff
5. **Store access tokens securely** and refresh them before expiration
6. **Log all API calls** for debugging and auditing
7. **Handle errors gracefully** with user-friendly messages

## Next Steps

- Review the <a href="/api-reference" target="_blank">API Reference</a> for all available endpoints
- Check the [Error Handling guide](/docs/errors) for error codes and strategies
- See [Authentication](/docs/authentication) for token management
