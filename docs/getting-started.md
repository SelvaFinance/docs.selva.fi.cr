---
sidebar_position: 2
---

# Getting Started

This guide will help you make your first API call to the Selva API in just a few minutes.

## Prerequisites

Before you begin, you'll need:

- A Selva account (contact support to get started)
- Client credentials (Client ID and Client Secret)
- Basic understanding of REST APIs and OAuth 2.0

## Step 1: Get Your Credentials

1. Log in to the Selva dashboard
2. Navigate to the API section
3. Create a new application or use an existing one
4. Copy your **Client ID** and **Client Secret**

Keep these credentials secure and never commit them to version control.

## Step 2: Authenticate

The Selva API uses OAuth 2.0. To get an access token:

### Option A: Using cURL

```bash
curl -X POST https://dev.selva.fi.cr/oauth/token \
  -H "Content-Type: application/json" \
  -d '{
    "grant_type": "authorization_code",
    "client_id": "your-client-id",
    "client_secret": "your-client-secret",
    "redirect_uri": "https://your-app.com/callback",
    "code": "authorization-code-from-callback"
  }'
```

### Option B: Using JavaScript/Node.js

```javascript
const response = await fetch('https://dev.selva.fi.cr/oauth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    grant_type: 'authorization_code',
    client_id: 'your-client-id',
    client_secret: 'your-client-secret',
    redirect_uri: 'https://your-app.com/callback',
    code: 'authorization-code-from-callback',
  }),
});

const data = await response.json();
const accessToken = data.access_token;
```

The response will include an `access_token` that you'll use for subsequent API calls.

## Step 3: Make Your First API Call

Now that you have an access token, let's check your accounts:

```bash
curl -X GET https://dev.selva.fi.cr/api/accounts \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

Or using JavaScript:

```javascript
const response = await fetch('https://dev.selva.fi.cr/api/accounts', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  },
});

const accounts = await response.json();
console.log('Your accounts:', accounts);
```

## Step 4: Check Service Status

Verify the API is available:

```bash
curl https://dev.selva.fi.cr/api/IsServiceAvailable
```

## Example: Create a Payment

Here's a complete example of creating a payment:

```javascript
// 1. Get access token (from Step 2)
const accessToken = 'your-access-token';

// 2. Generate idempotency key
const idempotencyKey = crypto.randomUUID();

// 3. Create payment
const paymentResponse = await fetch('https://dev.selva.fi.cr/api/payments', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    'X-Idempotency-Key': idempotencyKey,
  },
  body: JSON.stringify({
    amount: 10000,
    currency: 'CRC',
    recipient_identifier: 'CR78037010600458074353',
    description: 'Payment for services',
    payment_method: 'transfer',
  }),
});

const payment = await paymentResponse.json();
console.log('Payment created:', payment);
```

## Next Steps

- Learn about [Authentication](/docs/authentication) in detail
- Explore the [API Reference](/docs/api-reference) for all available endpoints
- Check out [Common Workflows](/docs/common-workflows) for integration patterns
- Review [Error Handling](/docs/errors) to handle errors gracefully

## SDKs and Libraries

While the API can be called directly, you may find these resources helpful:

- **Postman Collection**: Import our Postman collection for testing
- **OpenAPI Spec**: Download the OpenAPI specification for code generation

## Need Help?

If you run into issues:

1. Check the [Error Handling guide](/docs/errors)
2. Verify your credentials are correct
3. Ensure your access token hasn't expired
4. Contact support at support@selva.fi.cr



