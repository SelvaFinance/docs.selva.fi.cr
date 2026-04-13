---
sidebar_position: 3
---

# Authentication

SELVA API access is managed through the dashboard.

## Get API access in the dashboard

Use the SELVA dashboard to provision API access for your environment.
Once access has been enabled, SELVA will issue the bearer token your
application should use when calling authenticated endpoints.

If you need access for a new environment, or if your token needs to be
rotated, manage that through the dashboard.

## Send authenticated requests

Include the issued token in the `Authorization` header of every
authenticated request:

```bash
curl https://{base-url}/api/accounts \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

Payment creation requests must also include an `X-Idempotency-Key`
header so retries can be handled safely:

```bash
curl https://{base-url}/api/payments \
  -X POST \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "X-Idempotency-Key: YOUR_IDEMPOTENCY_KEY" \
  -d '{
    "source_account_id": "YOUR_SOURCE_ACCOUNT_ID",
    "amount": 10000
  }'
```

## Security best practices

1. Store bearer tokens securely and never commit them to version control.
2. Use HTTPS for every request.
3. Rotate tokens through the dashboard when access changes.
4. Limit token distribution to the services that need it.
5. Use a unique `X-Idempotency-Key` for every payment creation request.

## Authentication errors

Authenticated endpoints return `401 Unauthorized` when the
`Authorization` header is missing or the bearer token is invalid.

Typical causes include:

- Missing `Authorization: Bearer <token>` header
- Expired or revoked bearer token
- Using a token issued for a different environment

If a request starts returning `401`, verify that your application is
using the current token issued in the dashboard.

## Next steps

- Make your first request with [Getting Started](/docs/getting-started)
- Explore the <a href="/api-reference" target="_blank">API Reference</a>
- Review [Error Handling](/docs/errors) for common failure modes
