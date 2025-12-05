# Selva API Documentation

Complete API documentation system built with Docusaurus and Scalar.

## Overview

This documentation site provides comprehensive API documentation for the Selva Finance API, including:

- Interactive API reference powered by Scalar
- Getting started guides
- Authentication documentation
- Common workflows and examples
- Error handling guide

## Local Development

### Prerequisites

- Node.js 20 or higher (Docusaurus 3.x requires Node 20+)
- yarn

### Setup

1. Install dependencies:
```bash
yarn install
```

2. Start the development server:
```bash
yarn start
```

The site will be available at `http://localhost:3000` (Spanish, default locale)

**Note:** In development mode, Docusaurus only serves one locale at a time. To test the English version:
```bash
yarn start:en
```

This will serve the site at `http://localhost:3000` with English as the active locale. In production builds, all locales are available and the language selector works correctly.

### Build

Build the site for production:
```bash
yarn build
```

### Serve Production Build

Preview the production build locally:
```bash
yarn serve
```

## Project Structure

```
docs.selva.fi.cr/
├── .github/workflows/    # GitHub Actions deployment workflow
├── docs/                 # Documentation pages (MDX)
├── src/
│   ├── components/       # React components
│   ├── css/             # Custom styles
│   └── pages/           # Homepage and other pages
├── static/
│   └── openapi/         # OpenAPI specification
├── docusaurus.config.js # Docusaurus configuration
└── sidebars.js          # Sidebar configuration
```

## Documentation Pages

- **Overview** (`/docs/overview`) - API overview and capabilities
- **Getting Started** (`/docs/getting-started`) - Quickstart guide
- **Authentication** (`/docs/authentication`) - OAuth 2.0 flow documentation
- **API Reference** (`/docs/api-reference`) - Interactive API documentation
- **Common Workflows** (`/docs/common-workflows`) - Integration patterns
- **Errors** (`/docs/errors`) - Error handling guide

## OpenAPI Specification

The API specification is located at `static/openapi/openapi.yaml`. This file is:

- Converted from the original Postman collection
- Validated against OpenAPI 3.0
- Enhanced with descriptions, examples, and response schemas
- Used by Scalar to generate the interactive API reference

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

The deployment workflow:
1. Builds the Docusaurus site
2. Deploys to the `gh-pages` branch
3. Publishes to `https://docs.selva.fi.cr` (custom domain)

### Manual Deployment

To manually deploy:
```bash
yarn deploy
```

## Configuration

### GitHub Pages Settings

The site is configured for GitHub Pages deployment with a custom domain:
- **Organization**: SelvaFinance
- **Repository**: docs.selva.fi.cr
- **Custom Domain**: `docs.selva.fi.cr`
- **Base URL**: `/` (for custom domain)
- **Deployment Branch**: `gh-pages`

**Note:** The site is configured for the custom domain `docs.selva.fi.cr`. The original GitHub Pages URL (`https://selvafinance.github.io/docs.selva.fi.cr/`) may not work correctly as assets are built with `baseUrl: '/'`.

### Scalar Configuration

Scalar is configured in `docusaurus.config.js` to load the OpenAPI spec from `/openapi/openapi.yaml`.

## Contributing

1. Make changes to documentation files in `docs/`
2. Update the OpenAPI spec in `static/openapi/openapi.yaml` if needed
3. Test locally with `yarn start`
4. Commit and push to `main` branch
5. GitHub Actions will automatically deploy

## Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Scalar Documentation](https://scalar.com/docs)
- [OpenAPI Specification](https://swagger.io/specification/)
