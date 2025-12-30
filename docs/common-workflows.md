---
sidebar_position: 5
---

# Common Workflows

This guide covers common integration patterns and workflows for the Selva API.

## Workflow 1: Payment Processing

Complete flow for processing a payment from validation to completion.

### Step 1: Validate Payment

Before creating a payment, validate the payment details:

```javascript
const validateResponse = await fetch('https://dev.selva.fi.cr/api/payments/validate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    amount: 10000,
    currency: 'CRC',
    recipient_identifier: 'CR78037010600458074353',
  }),
});

const validation = await validateResponse.json();

if (!validation.valid) {
  console.error('Validation errors:', validation.errors);
  // Handle validation errors
  return;
}
```

### Step 2: Create Payment

Once validated, create the payment with an idempotency key:

```javascript
const idempotencyKey = crypto.randomUUID();

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
console.log('Payment created:', payment.id);
```

### Step 3: Poll for Status

Check payment status until it's completed or failed:

```javascript
async function waitForPaymentCompletion(paymentId) {
  while (true) {
    const response = await fetch(`https://dev.selva.fi.cr/api/payments/${paymentId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    
    const payment = await response.json();
    
    if (payment.status === 'completed') {
      return payment;
    }
    
    if (payment.status === 'failed' || payment.status === 'cancelled') {
      throw new Error(`Payment ${payment.status}`);
    }
    
    // Wait before polling again
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}
```

## Workflow 2: Account Management

Complete flow for managing accounts and viewing transactions.

### Create Account

```javascript
const accountResponse = await fetch('https://dev.selva.fi.cr/api/accounts', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    currency: 'CRC',
  }),
});

const account = await accountResponse.json();
console.log('Account created:', account.id);
```

### Get Account Balance

```javascript
const balanceResponse = await fetch(
  `https://dev.selva.fi.cr/api/accounts/${accountId}/balance`,
  {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  }
);

const balance = await balanceResponse.json();
console.log(`Balance: ${balance.currency} ${balance.balance}`);
```

### View Account Movements

```javascript
const movementsResponse = await fetch(
  `https://dev.selva.fi.cr/api/accounts/${accountId}/movements?start_date=2024-01-01T00:00:00Z&end_date=2024-12-31T23:59:59Z`,
  {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  }
);

const movements = await movementsResponse.json();
console.log('Account movements:', movements);
```

## Workflow 3: Webhook Integration

Set up webhooks to receive real-time notifications.

### Step 1: Create Webhook Subscription

```javascript
const webhookResponse = await fetch('https://dev.selva.fi.cr/api/webhooks/subscriptions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://your-app.com/webhooks',
    events: 'payment.completed,payment.failed,account.created',
    max_attempts: '3',
    headers: {
      'X-Custom-Header': 'custom-value',
    },
  }),
});

const subscription = await webhookResponse.json();
console.log('Webhook subscription created:', subscription.id);
```

### Step 2: Handle Webhook Events

Implement a webhook endpoint in your application:

```javascript
// Express.js example
app.post('/webhooks', async (req, res) => {
  const signature = req.headers['signature'];
  const payload = req.body;
  
  // Verify webhook signature
  if (!verifySignature(signature, payload)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // Handle different event types
  if (payload.event === 'payment.completed') {
    await handlePaymentCompleted(payload.data);
  } else if (payload.event === 'payment.failed') {
    await handlePaymentFailed(payload.data);
  }
  
  res.status(200).json({ status: 'received' });
});
```

### Step 3: Handle Incoming Transfers

For incoming transfer notifications:

```javascript
app.post('/webhooks/incoming-transfers', async (req, res) => {
  const signature = req.headers['signature'];
  const notification = req.body;
  
  // Verify signature
  if (!verifySignature(signature, notification)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // Process each transfer
  for (const transfer of notification.Transfers) {
    await processIncomingTransfer(transfer);
  }
  
  res.status(200).json({ status: 'received' });
});
```

## Workflow 4: Verification Services

Verify account information before processing payments.

### Verify IBAN

```javascript
const ibanResponse = await fetch('https://dev.selva.fi.cr/api/iban/information', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    iban: 'CR78037010600458074353',
  }),
});

const ibanInfo = await ibanResponse.json();

if (ibanInfo.valid) {
  console.log('IBAN is valid:', ibanInfo.account_holder);
} else {
  console.error('Invalid IBAN');
}
```

### Verify Phone Number

```javascript
const phoneResponse = await fetch(
  'https://dev.selva.fi.cr/api/phone/information?phone_number=+50688888888',
  {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  }
);

const phoneInfo = await phoneResponse.json();
console.log('Phone verified:', phoneInfo.verified);
```

## Workflow 5: Error Handling and Retries

Implement robust error handling with exponential backoff.

```javascript
async function apiCallWithRetry(url, options, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      if (response.ok) {
        return await response.json();
      }
      
      // Don't retry on client errors (4xx)
      if (response.status >= 400 && response.status < 500) {
        const error = await response.json();
        throw new Error(error.message);
      }
      
      // Retry on server errors (5xx)
      if (response.status >= 500) {
        throw new Error('Server error');
      }
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw error;
      }
      
      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// Usage
try {
  const accounts = await apiCallWithRetry(
    'https://dev.selva.fi.cr/api/accounts',
    {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  );
} catch (error) {
  console.error('API call failed:', error);
}
```

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


