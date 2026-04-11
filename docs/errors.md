---
sidebar_position: 6
---

# Error Handling

This guide explains how to handle errors when using the Selva API.

## Error Response Format

All API errors follow a consistent format:

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

## HTTP Status Codes

The API uses standard HTTP status codes:

| Status Code | Meaning               | Description                              |
| ----------- | --------------------- | ---------------------------------------- |
| 200         | OK                    | Request successful                       |
| 201         | Created               | Resource created successfully            |
| 204         | No Content            | Request successful, no content to return |
| 400         | Bad Request           | Invalid request parameters or body       |
| 401         | Unauthorized          | Invalid or missing authentication token  |
| 403         | Forbidden             | Insufficient permissions                 |
| 422         | Unprocessable Content | Request validation failed                |
| 404         | Not Found             | Resource does not exist                  |
| 500         | Internal Server Error | Server error occurred                    |
| 503         | Service Unavailable   | Service temporarily unavailable          |

## Common Error Responses

### Authentication Errors

#### Invalid client credentials

- **Status**: 401
- **Description**: Invalid client ID or secret
- **Solution**: Verify your credentials are correct

```json
{
  "success": false,
  "message": "Invalid client credentials",
  "data": null,
  "errors": {}
}
```

#### Invalid authorization grant

- **Status**: 401
- **Description**: Invalid or expired authorization code
- **Solution**: Request a new authorization code

```json
{
  "success": false,
  "message": "The authorization code is invalid or has expired",
  "data": null,
  "errors": {}
}
```

#### Unauthorized

- **Status**: 401
- **Description**: Invalid or expired access token
- **Solution**: Refresh your access token or re-authenticate

```json
{
  "success": false,
  "message": "Invalid or expired access token",
  "data": null,
  "errors": {}
}
```

### Request Errors

#### Invalid request

- **Status**: 400
- **Description**: Missing or invalid request parameters
- **Solution**: Check required parameters and their formats

```json
{
  "success": false,
  "message": "The request is missing a required parameter",
  "data": null,
  "errors": {
    "missing_field": "amount"
  }
}
```

#### Validation failed

- **Status**: 422
- **Description**: Request body validation failed
- **Solution**: Review validation errors and fix the request

```json
{
  "success": false,
  "message": "Request validation failed",
  "data": null,
  "errors": {
    "amount": ["Amount must be greater than 0"]
  }
}
```

### Resource Errors

#### Resource not found

- **Status**: 404
- **Description**: Requested resource does not exist
- **Solution**: Verify the resource ID is correct

```json
{
  "success": false,
  "message": "The requested resource was not found",
  "data": null,
  "errors": {}
}
```

#### Forbidden

- **Status**: 403
- **Description**: Insufficient permissions
- **Solution**: Check your OAuth scopes and permissions

```json
{
  "success": false,
  "message": "You do not have permission to access this resource",
  "data": null,
  "errors": {}
}
```

### Server Errors

#### Internal server error

- **Status**: 500
- **Description**: Internal server error
- **Solution**: Retry the request with exponential backoff

```json
{
  "success": false,
  "message": "An internal server error occurred",
  "data": null,
  "errors": {}
}
```

#### Service unavailable

- **Status**: 503
- **Description**: Service temporarily unavailable
- **Solution**: Retry after the indicated retry period

```json
{
  "success": false,
  "message": "Service temporarily unavailable",
  "data": null,
  "errors": {
    "retry_after": 60
  }
}
```

## Error Handling Strategies

### 1. Retry Logic

Implement retry logic for transient errors (5xx status codes):

```javascript
async function apiCallWithRetry(url, options, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        return await response.json();
      }

      // Don't retry client errors
      if (response.status >= 400 && response.status < 500) {
        const error = await response.json();
        throw new Error(error.message);
      }

      // Retry server errors
      if (response.status >= 500) {
        throw new Error('Server error');
      }
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw error;
      }

      // Exponential backoff
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}
```

### 2. Rate Limit Handling

Handle rate limit errors (429 status code):

```javascript
async function handleRateLimit(response) {
  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After');
    const delay = retryAfter ? parseInt(retryAfter) * 1000 : 60000;

    console.log(`Rate limited. Retrying after ${delay}ms`);
    await new Promise((resolve) => setTimeout(resolve, delay));
    return true; // Indicate retry needed
  }
  return false;
}
```

### 3. Token Refresh

Automatically refresh expired tokens:

```javascript
async function makeAuthenticatedRequest(url, options = {}) {
  let accessToken = getStoredAccessToken();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // If unauthorized, try refreshing token
  if (response.status === 401) {
    accessToken = await refreshAccessToken();

    // Retry with new token
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return response;
}
```

### 4. User-Friendly Error Messages

Map HTTP status codes to user-friendly messages:

```javascript
const errorMessages = {
  400: 'Please check your input and try again',
  401: 'Your session has expired. Please log in again',
  403: 'You do not have permission to perform this action',
  422: 'Please review the highlighted fields and try again',
  404: 'The requested item could not be found',
  500: 'A server error occurred. Please try again later',
};

function getUserFriendlyError(error, status) {
  return (
    error.message || errorMessages[status] || 'An unexpected error occurred'
  );
}
```

## Validation Errors

Payment and account creation endpoints return detailed validation errors:

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

Display these errors to users to help them fix their input.

## Webhook Error Handling

When receiving webhooks, always return a 200 status code to acknowledge receipt, even if processing fails:

```javascript
app.post('/webhooks', async (req, res) => {
  try {
    // Verify signature
    if (!verifySignature(req.headers['signature'], req.body)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid signature',
        data: null,
        errors: {},
      });
    }

    // Process webhook
    await processWebhook(req.body);

    // Always return 200 to acknowledge receipt
    res.status(200).json({ status: 'received' });
  } catch (error) {
    // Log error but still acknowledge receipt
    console.error('Webhook processing error:', error);
    res.status(200).json({ status: 'received' });
  }
});
```

## Testing Error Scenarios

Test your error handling by:

1. **Invalid credentials**: Use wrong client ID/secret
2. **Expired tokens**: Wait for token expiration
3. **Invalid requests**: Send malformed request bodies
4. **Missing resources**: Request non-existent IDs
5. **Rate limiting**: Make rapid requests

## Monitoring and Logging

Log all errors for monitoring and debugging:

```javascript
async function logError(error, context) {
  console.error('API Error:', {
    success: error.success,
    message: error.message,
    errors: error.errors,
    status: context.status,
    endpoint: context.url,
    timestamp: new Date().toISOString(),
  });

  // Send to error tracking service (e.g., Sentry)
  // trackError(error, context);
}
```

## Next Steps

- Review [Common Workflows](/docs/common-workflows) for error handling patterns
- Check the <a href="/api-reference" target="_blank">API Reference</a> for endpoint-specific errors
- See [Authentication](/docs/authentication) for token error handling
