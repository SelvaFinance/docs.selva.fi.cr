---
sidebar_position: 4
---

# API Reference

The Selva API provides a comprehensive set of endpoints for payment processing, account management, and webhook subscriptions.

Authentication is managed through the SELVA dashboard. For authenticated endpoints, include the bearer token issued for your environment in the `Authorization` header.

## Interactive API Documentation

Explore all available endpoints, try requests, and view responses using our interactive API documentation powered by Scalar.

**Open the interactive API Reference:** <a href="/api-reference" target="_blank">/api-reference</a>

The API reference is automatically generated from our OpenAPI specification and provides an interactive interface to explore all endpoints, view request/response schemas, and test API calls directly from your browser.

## Endpoint Categories

### Accounts

- `GET /api/accounts` - List all accounts
- `POST /api/accounts` - Create a new account
- `GET /api/accounts/{id}` - Get account details
- `GET /api/accounts/{id}/balance` - Get account balance

### Payments

- `POST /api/payments` - Create a payment
- `POST /api/payments/validate` - Validate payment details
- `GET /api/payments/history` - Get payment history
- `GET /api/payments/{id}` - Get payment by ID
- `GET /api/payments/service-status` - Check payment rail availability

### Verification

- `GET /api/phone/information/{phone}` - Get phone number information
- `GET /api/iban/information/{iban}` - Get IBAN information

### Foreign Exchange

- `GET /api/fx/rates` - Get USD/CRC exchange rates with SELVA spread applied
- `GET /api/fx/ari-rates` - Get original Ari USD/CRC exchange rates without SELVA spread

### Webhooks

- `GET /api/webhooks/subscriptions` - List webhook subscriptions
- `POST /api/webhooks/subscriptions` - Create webhook subscription
- `GET /api/webhooks/subscriptions/{id}` - Get webhook subscription
- `DELETE /api/webhooks/subscriptions/{id}` - Delete webhook subscription
- `POST /api/webhooks/subscriptions/{id}/suspend` - Suspend webhook delivery
- `POST /api/webhooks/subscriptions/{id}/resume` - Resume webhook delivery

## Request Format

All API requests use:

- **Content-Type**: `application/json` for POST requests
- **Authorization**: `Bearer {access_token}` header for authenticated requests
- **Idempotency**: Include `X-Idempotency-Key` header for `POST /api/payments`

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

List endpoints support pagination using `page` and `per_page` parameters:

```
GET /api/payments/history?page=1&per_page=20
```

Response includes pagination metadata:

```json
{
  "success": true,
  "message": "Payment history retrieved successfully",
  "data": []
}
```

## Filtering and Sorting

Many list endpoints support filtering and sorting. See individual endpoint documentation for available options.

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "data": null,
  "errors": {}
}
```

See the [Error Handling guide](/docs/errors) for detailed error examples and handling strategies.

## OpenAPI Specification

Download the complete OpenAPI 3.1 specification:

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
