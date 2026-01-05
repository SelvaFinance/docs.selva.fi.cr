---
sidebar_position: 7
title: Release Notes
---

# Release Notes

Updates to the Selva API platform, including payments, account management, and more.

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
