---
sidebar_position: 1
---

# API Overview

Welcome to the Selva API documentation. The Selva API provides comprehensive financial services for building payment and banking applications.

## What is Selva?

Selva (Soluciones Electrónicas Locales de Valor) is a financial services platform that enables businesses to integrate payment processing, account management, and banking operations into their applications.

## Key Features

### Payment Processing

- Send payments via PIN (IBAN) or SINPE Móvil (phone)
- Validate payment payloads before submitting (`POST /api/payments/validate`)
- Initiate payments with idempotency protection (`POST /api/payments` with `X-Idempotency-Key`)
- Retrieve payment history and specific payment status
- Check payment rail availability (`GET /api/payments/service-status`)

### Account Management

- Create multi-currency accounts
- List, view, and fetch balances/details for accounts
- Retrieve account movements and specific transfer details
- KYC is handled at the user level (see KYC & Onboarding)

### KYC & Onboarding

- Track KYC status (`GET /api/kyc/status`)
- Create/update KYC applications (`GET/POST /api/kyc/application`)
- Submit applications and upload documents (`POST /api/kyc/submit`, `POST /api/kyc/document`)

### Verification Services

- Validate SINPE phone ownership (`GET /api/phone/information`)
- Validate IBAN and account holder data (`GET /api/iban/information`)

### Webhooks

- Manage subscriptions (list/get/create/delete)
- Control delivery with suspend/resume actions and per-subscription secrets
- Receive payment and account events in real time

## API Architecture

The Selva API follows RESTful principles and uses standard HTTP methods:

- **GET** - Retrieve resources
- **POST** - Create resources or perform actions
- **DELETE** - Remove resources

All API requests use JSON for request and response bodies, and require OAuth 2.0 authentication.

## Base URLs

- **Development**: `https://dev.selva.fi.cr/api`
- **Production**: `https://api.selva.fi.cr/api` (contact support for access)
- **Local**: `http://localhost:8000/api` (for local development)

## Authentication

The API uses OAuth 2.0 for authentication. You'll need to:

1. Obtain client credentials from the Selva dashboard
2. Implement the OAuth 2.0 authorization code flow
3. Include access tokens in the `Authorization` header

See the [Authentication guide](/docs/authentication) for detailed instructions.

## Rate Limits

No explicit per-endpoint rate limits are enforced yet. Payments rely on idempotency keys to prevent duplicates; contact support for production quota details.

## Support

For questions, issues, or feature requests:

- **Email**: support@selva.fi.cr
- **Documentation**: This site
- **Status**: Check payment rail availability at `GET /api/payments/service-status`

## Getting Started

Ready to start integrating? Check out our [Getting Started guide](/docs/getting-started) to make your first API call.
