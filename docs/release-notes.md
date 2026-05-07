---
sidebar_position: 7
title: Release Notes
---

# Release Notes

Updates to the Selva API platform, including payments, account management, and more.

### May 7, 2026

#### Breaking Changes

- Removed `reference` from payment request payloads, payment responses, and webhook notification payloads. Use `description` for payment notes.
- Removed `cgp_ref_number` from payment detail, payment history, and webhook notification payloads.
- `GET /api/fx/rates` and `GET /api/fx/ari-rates` now require bearer authentication with payment-sending access.

#### Response Changes

- `POST /api/payments` now returns the initiated payment payload, including `idempotency_key`, `source_account_id`, `recipient_iban`, `recipient_phone`, `amount`, and `description`.
- Payment creation responses now use `channel` consistently for `pin` and `sinpe_movil` payments.

#### Validation Changes

- `description` is optional, but when provided it must be between 15 and 255 characters.
- If `description` is omitted, SELVA applies a channel-specific default: `PIN transfer payment` or `SINPE Móvil transfer payment`.

### May 6, 2026

#### Documentation Updates

- Added incoming webhook notification payload examples for `payment.created`, `payment.processing`, `payment.completed`, `payment.failed`, and `transaction.received`.
- Documented `fee` behavior in payment webhook notifications: `fee` is `null` for `payment.created` and `payment.processing`, and defined for `payment.completed` once final processing cost is known.
- Added separate `transaction.received` examples for PIN and SINPE Móvil incoming credits.
- Clarified that SINPE Móvil incoming transaction origins can have `payer.iban: null`, and origin `payer.phone_number` can also be `null` when not provided by the upstream response.
- Added OpenAPI webhook schemas and examples for incoming webhook delivery payloads.

### April 10, 2026

#### Breaking Changes

- `GET /api/accounts/{id}/details` is no longer part of the published public API.
- Detailed account data is now returned from `GET /api/accounts/{id}`.
- Payment request payloads now use `source_account_id` instead of `from_account_id`.
- Payment history query parameters changed from `payment_method` to `channel`, `recipient_identifier` to `recipient_document_number`, and `limit`/`offset` to `per_page`/`page`.

#### Response Changes

- `GET /api/accounts/{id}` now returns the detailed account payload, including `document_number`, `document_type`, `iban`, `balance`, `owner_name`, `status`, `created_at`, and `updated_at`.
- `POST /api/payments/validate` now returns `channel` and `fee` instead of `payment_type`, `estimated_fees`, and `service_available`.
- Payment resources were aligned to the latest payload fields, including `channel_reference`, `sinpe_reference`, `channel`, and payer/payee `document_type` values.
- Phone and IBAN verification responses were standardized around holder identity and account status fields.

#### Notes

- Internal-only endpoint groups remain excluded from the public documentation.

### January 5, 2026

#### Breaking Changes

**API Endpoint Structure Changes**

- Phone information endpoint changed from query parameter to path parameter:
  - Old: `GET /phone/information?phone_number=88881234`
  - New: `GET /phone/information/{phone_number}`
- IBAN information endpoint changed from query parameter to path parameter:
  - Old: `GET /iban/information?iban=CR01...`
  - New: `GET /iban/information/{iban}`

**Response Format Changes**

- Document numbers in payment responses now return raw database format instead of formatted version:
  - Old: `"1-2345-6789"` (formatted)
  - New: `"123456789"` (raw database format)
- Balance data format changed to integer (in cents) with new `formatted` field:
  - Old: `{"balance": 1250.50}`
  - New: `{"balance": 125050, "formatted": "1,250.50 CRC"}`

**Authentication Requirements**

- `X-Idempotency-Key` header is now **required** for all payment endpoints (was previously optional)
- Missing header will result in HTTP 400 Bad Request

**Error Code Changes**

- Webhook subscription state conflicts now return HTTP 409 Conflict instead of HTTP 400 Bad Request:
  - Attempting to suspend an already-suspended subscription
  - Attempting to resume a non-suspended subscription

#### New Features

**Enhanced Account Lookups**

- Added internal SELVA account lookup for IBAN information (when IBAN belongs to SELVA)
- Added internal account lookup for phone information (when phone belongs to SELVA user)
- Internal lookups bypass external SINPE API calls for faster responses

**Validation Improvements**

- Added idempotency key uniqueness validation on `/validate` endpoint
- Returns HTTP 409 Conflict if payment already processed with same idempotency key
- Added `bail` flag to payment validation for faster failure on first error

#### Enhancements

**Payment Response Enhancements**

- Added `name` to both `payer` and `payee` objects in payment responses
- Payee now includes `iban` for PIN payments or `phone_number` for SINPE payments
- Removed `currency` and `email` fields from payer/payee payloads
- Affected endpoints: `GET /api/payments/{id}`, `GET /api/payments/history`

**Account Details Response Update**

- `GET /api/accounts/{id}/details` now returns `origin_code` as a string and includes `owner_name`, `document_number`, `iban`, `currency`, `status`, and timestamps; deprecated `user_id` and `document_type` fields removed

**API Improvements**

- Standardized phone and IBAN endpoint request/response structures
- Improved error message consistency across all endpoints
- Added UUID validation for `from_account_id` field
- Replaced Spanish error messages from third-party services with English

### January 30, 2025

- Initial Selva API documentation
- Payments endpoints
- Account management endpoints
- Webhook subscriptions
- Interactive API reference with Scalar
