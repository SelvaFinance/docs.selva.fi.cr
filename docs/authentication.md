---
sidebar_position: 3
---

# Authentication

The Selva API uses OAuth 2.0 for authentication. This guide explains how to implement the OAuth 2.0 authorization code flow.

## OAuth 2.0 Flow Overview

The Selva API uses the **Authorization Code** flow, which is the most secure OAuth 2.0 flow for server-side applications.

```
┌─────────┐         ┌──────────────┐         ┌──────────┐
│  Your   │         │   Selva API  │         │   User   │
│   App   │         │              │         │          │
└────┬────┘         └──────┬───────┘         └────┬─────┘
     │                     │                      │
     │  1. Redirect to     │                      │
     │     /oauth/authorize│                      │
     ├────────────────────>│                      │
     │                     │  2. User authorizes  │
     │                     │<────────────────────┤
     │                     │                      │
     │  3. Authorization   │                      │
     │     code returned   │                      │
     │<────────────────────┤                      │
     │                     │                      │
     │  4. Exchange code   │                      │
     │     for token      │                      │
     ├────────────────────>│                      │
     │                     │                      │
     │  5. Access token   │                      │
     │     returned       │                      │
     │<────────────────────┤                      │
     │                     │                      │
```

## Step 1: Redirect User to Authorization Endpoint

Direct the user to the authorization endpoint with the required parameters:

```
GET https://dev.selva.fi.cr/oauth/authorize?
  client_id=your-client-id&
  redirect_uri=https://your-app.com/callback&
  response_type=code&
  scope=read-user read-accounts send-payments manage-webhooks
```

### Parameters

- **client_id** (required): Your application's client ID
- **redirect_uri** (required): The URI to redirect to after authorization. Must match a registered redirect URI.
- **response_type** (required): Must be `code` for authorization code flow
- **scope** (optional): Space-separated scopes you need (for example `read-accounts send-payments`)

### Example

```javascript
const authUrl = new URL('https://dev.selva.fi.cr/oauth/authorize');
authUrl.searchParams.set('client_id', 'your-client-id');
authUrl.searchParams.set('redirect_uri', 'https://your-app.com/callback');
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('scope', 'read-accounts send-payments');

// Redirect user to authUrl.toString()
window.location.href = authUrl.toString();
```

## Step 2: Handle the Authorization Callback

After the user authorizes your application, they'll be redirected back to your `redirect_uri` with an authorization code:

```
https://your-app.com/callback?code=AUTHORIZATION_CODE&state=optional_state
```

Extract the `code` parameter from the URL.

## Step 3: Exchange Code for Access Token

Exchange the authorization code for an access token by making a POST request to the token endpoint:

```bash
curl -X POST https://dev.selva.fi.cr/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "authorization_code",
    "client_id": "your-client-id",
    "client_secret": "your-client-secret",
    "redirect_uri": "https://your-app.com/callback",
    "code": "AUTHORIZATION_CODE",
    "scope": "read-accounts send-payments manage-webhooks"
  }'
```

### Response

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "refresh-token-here",
  "scope": "read-accounts send-payments manage-webhooks"
}
```

## Step 4: Use the Access Token

Include the access token in the `Authorization` header of all API requests (and `X-Idempotency-Key` where required):

```bash
curl -X GET https://dev.selva.fi.cr/api/accounts \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Token Expiration

Access tokens expire after a set period (typically 1 hour). When a token expires:

1. Use the `refresh_token` to obtain a new access token
2. Or redirect the user through the authorization flow again

Include `Accept: application/json` on token and API calls to ensure consistent responses.

## Refresh Tokens

To refresh an expired access token:

```bash
curl -X POST https://dev.selva.fi.cr/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "refresh_token",
    "client_id": "your-client-id",
    "client_secret": "your-client-secret",
    "refresh_token": "your-refresh-token"
  }'
```

## Scopes

Request only what you need (space-separated):

- **read-user**: Read basic profile information
- **read-accounts**: View account information, balances, transfers
- **manage-accounts**: Create accounts
- **send-payments**: Create/validate/payments and view payment history/status
- **manage-webhooks**: Manage webhook subscriptions

Request scopes during the authorization step. Users can grant or deny specific scopes.

## Security Best Practices

1. **Never expose client secrets**: Keep your `client_secret` on the server side only
2. **Use HTTPS**: Always use HTTPS for all API calls
3. **Store tokens securely**: Encrypt tokens in your database and rotate refresh tokens as needed
4. **Validate redirect URIs**: Only use registered redirect URIs
5. **Handle errors gracefully**: Implement proper error handling for expired or invalid tokens
6. **Use idempotency keys**: Include `X-Idempotency-Key` headers for payment requests (required for `POST /api/payments`)

## Error Responses

If authentication fails, you'll receive an error response:

```json
{
  "error": "invalid_grant",
  "message": "The authorization code is invalid or has expired"
}
```

Common errors:

- `invalid_client`: Invalid client ID or secret
- `invalid_grant`: Invalid or expired authorization code
- `invalid_scope`: Requested scope is invalid
- `invalid_token`: Access token is missing, invalid, or expired

See the [Error Handling guide](/docs/errors) for more details.

## Testing Authentication

You can test the authentication flow using:

1. **Postman**: Import our Postman collection and use the OAuth 2.0 helper
2. **cURL**: Use the examples above
3. **API Reference**: Try the endpoints in the <a href="/api-reference" target="_blank">API Reference</a>

## Next Steps

- Explore the <a href="/api-reference" target="_blank">API Reference</a> to see all available endpoints
- Learn about [Common Workflows](/docs/common-workflows) for typical integration patterns
- Review [Error Handling](/docs/errors) to handle errors properly


