---
sidebar_position: 4
---

# API Reference

The Selva API provides a comprehensive set of endpoints for payment processing, account management, and webhook subscriptions.

## Interactive API Documentation

Explore all available endpoints, try requests, and view responses using our interactive API documentation powered by Scalar.

import ScalarApiReference from '@site/src/components/ScalarApiReference';

<ScalarApiReference />

The API reference above is automatically generated from our OpenAPI specification and provides an interactive interface to explore all endpoints, view request/response schemas, and test API calls directly from your browser.

## Endpoint Categories

### Authentication
- `GET /oauth/authorize` - Initiate OAuth authorization flow
- `POST /oauth/token` - Exchange authorization code for access token

### Accounts
- `GET /api/accounts` - List all accounts
- `POST /api/accounts` - Create a new account
- `GET /api/accounts/information` - Get account information
- `GET /api/accounts/{identifier}/information` - Get account information by identifier
- `GET /api/accounts/{id}/balance` - Get account balance
- `GET /api/accounts/{id}/details` - Get account details
- `GET /api/accounts/{id}/movements` - Get account movements
- `GET /api/accounts/{id}/kyc` - Get KYC status
- `GET /api/accounts/{id}/transactions/{transactionCode}` - Get transaction by code

### Payments
- `POST /api/payments` - Create a payment
- `POST /api/payments/validate` - Validate payment details
- `GET /api/payments/history` - Get payment history
- `GET /api/payments/{id}` - Get payment by ID

### Verification
- `GET /api/phone/information` - Get phone number information
- `GET /api/iban/information` - Get IBAN information

### Webhooks
- `GET /api/webhooks/subscriptions` - List webhook subscriptions
- `POST /api/webhooks/subscriptions` - Create webhook subscription
- `GET /api/webhooks/subscriptions/{id}` - Get webhook subscription
- `DELETE /api/webhooks/subscriptions/{id}` - Delete webhook subscription
- `POST /api/NotifyIncomingTransfers` - Incoming transfer webhook

### System
- `GET /api/IsServiceAvailable` - Check service availability

## Request Format

All API requests use:

- **Content-Type**: `application/json` for POST requests
- **Authorization**: `Bearer {access_token}` header for authenticated requests
- **Idempotency**: Include `X-Idempotency-Key` header for payment requests

## Response Format

All API responses use JSON format and include standard HTTP status codes:

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `204 No Content` - Request successful, no content to return
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Invalid or missing authentication
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error
- `503 Service Unavailable` - Service temporarily unavailable

## Rate Limits

API rate limits are applied per client and endpoint. Rate limit information is included in response headers:

- `X-RateLimit-Limit` - Maximum number of requests allowed
- `X-RateLimit-Remaining` - Number of requests remaining
- `X-RateLimit-Reset` - Time when the rate limit resets

## Pagination

List endpoints support pagination using `limit` and `offset` parameters:

```
GET /api/payments/history?limit=20&offset=0
```

Response includes pagination metadata:

```json
{
  "data": [...],
  "limit": 20,
  "offset": 0,
  "total": 100,
  "has_more": true
}
```

## Filtering and Sorting

Many list endpoints support filtering and sorting. See individual endpoint documentation for available options.

## Error Handling

All errors follow a consistent format:

```json
{
  "error": "error_code",
  "message": "Human-readable error message",
  "details": {}
}
```

See the [Error Handling guide](/docs/errors) for detailed error codes and handling strategies.

## OpenAPI Specification

Download the complete OpenAPI 3.0 specification:

- [openapi.yaml](/openapi/openapi.yaml)

You can use this specification to:

- Generate client SDKs
- Import into API testing tools (Postman, Insomnia)
- Generate documentation
- Validate requests and responses

## SDKs and Code Examples

While the API can be called directly, you may find these helpful:

- **Postman Collection**: Import for testing
- **Code Examples**: See [Common Workflows](/docs/common-workflows) for integration patterns

## Support

For questions about specific endpoints:

- Check the interactive API documentation above
- Review [Common Workflows](/docs/common-workflows) for usage examples
- Contact support at support@selva.fi.cr

