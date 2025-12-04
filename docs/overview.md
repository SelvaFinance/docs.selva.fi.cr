---
sidebar_position: 1
---

# API Overview

Welcome to the Selva API documentation. The Selva API provides comprehensive financial services for building payment and banking applications.

## What is Selva?

Selva (Soluciones Electrónicas Locales de Valor) is a financial services platform that enables businesses to integrate payment processing, account management, and banking operations into their applications.

## Key Features

### Payment Processing
- Create and process payments
- Validate payment details before processing
- Retrieve payment history and status
- Support for multiple payment methods (transfers, cards, cash)

### Account Management
- Create and manage accounts
- Check account balances
- View account details and information
- Retrieve transaction history and movements
- Access KYC (Know Your Customer) status

### Verification Services
- Verify phone numbers
- Validate IBAN (International Bank Account Number)
- Check account information

### Webhooks
- Subscribe to real-time events
- Receive notifications for payments, transfers, and account activities
- Configure custom headers and retry policies

## API Architecture

The Selva API follows RESTful principles and uses standard HTTP methods:

- **GET** - Retrieve resources
- **POST** - Create resources or perform actions
- **DELETE** - Remove resources

All API requests use JSON for request and response bodies, and require OAuth 2.0 authentication.

## Base URLs

- **Development**: `https://dev.selva.fi.cr`
- **Production**: `https://api.selva.fi.cr` (contact support for access)
- **Local**: `http://localhost` (for local development)

## Authentication

The API uses OAuth 2.0 for authentication. You'll need to:

1. Obtain client credentials from the Selva dashboard
2. Implement the OAuth 2.0 authorization code flow
3. Include access tokens in the `Authorization` header

See the [Authentication guide](/docs/authentication) for detailed instructions.

## Rate Limits

API rate limits are applied per client and endpoint. Contact support for information about your specific rate limits.

## Support

For questions, issues, or feature requests:

- **Email**: support@selva.fi.cr
- **Documentation**: This site
- **Status Page**: Check service availability at `/api/IsServiceAvailable`

## Getting Started

Ready to start integrating? Check out our [Getting Started guide](/docs/getting-started) to make your first API call.

