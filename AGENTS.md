# AI Agent Guidelines

This document provides instructions for AI coding assistants (Claude Code, GitHub Copilot, Cursor, etc.) working on this repository.

## Project Overview

This is the **Selva Finance API Documentation** site built with:

- **Docusaurus 3.x** - Static site generator for documentation
- **Scalar** - Interactive OpenAPI documentation
- **TypeScript/React** - Custom components
- **Node.js 20+** - Runtime requirement

## Project Structure

```
docs.selva.fi.cr/
├── docs/                    # Markdown documentation pages
├── src/
│   ├── components/          # React components (TSX)
│   ├── css/                 # Custom stylesheets
│   ├── pages/               # Page components
│   └── theme/               # Theme customizations
├── static/
│   └── openapi/             # OpenAPI specification (openapi.yaml)
├── docusaurus.config.js     # Main Docusaurus configuration
├── sidebars.js              # Sidebar navigation configuration
└── tsconfig.json            # TypeScript configuration
```

## Development Commands

```bash
yarn install        # Install dependencies
yarn start          # Start development server (localhost:3000)
yarn build          # Build for production
yarn serve          # Preview production build
yarn lint           # Run ESLint
yarn lint:fix       # Fix ESLint issues
yarn format         # Format code with Prettier
yarn format:check   # Check code formatting
```

## Code Style

### Linting & Formatting

- **ESLint** is configured for TypeScript and React
- **Prettier** handles code formatting
- Run `yarn lint` before committing
- Run `yarn format` to auto-format code

### TypeScript

- All new components should be written in TypeScript (`.tsx`)
- Use proper type annotations
- Avoid `any` types when possible

### React Components

- Functional components with hooks preferred
- Components go in `src/components/` or `src/theme/`
- Follow existing naming conventions (PascalCase for components)

## Documentation Guidelines

### Markdown Files

- Documentation pages are in `docs/` directory
- Use MDX format for React components in docs
- Follow the existing frontmatter structure

### OpenAPI Specification

- Located at `static/openapi/openapi.yaml`
- Used by Scalar to generate interactive API reference
- Validate changes against OpenAPI 3.0 specification
- Include descriptions, examples, and response schemas

## Key Files

| File                          | Purpose                         |
| ----------------------------- | ------------------------------- |
| `docusaurus.config.js`        | Main site configuration         |
| `sidebars.js`                 | Documentation sidebar structure |
| `static/openapi/openapi.yaml` | API specification               |
| `src/css/custom.css`          | Global custom styles            |

## Commit Guidelines

- Write clear, concise commit messages
- Reference related issues when applicable
- Keep commits focused on single changes

## Deployment

- Automatic deployment via GitHub Actions on push to `main`
- Deploys to GitHub Pages at `https://docs.selva.fi.cr`
- Manual deploy: `yarn deploy`

## Common Tasks

### Adding a New Documentation Page

1. Create a new `.md` file in `docs/`
2. Add frontmatter with `sidebar_position`
3. Update `sidebars.js` if needed

### Modifying the API Reference

1. Edit `static/openapi/openapi.yaml`
2. Validate the YAML syntax
3. Test with `yarn start`

### Creating a New Component

1. Create `.tsx` file in `src/components/`
2. Use TypeScript with proper types
3. Export from component file
4. Import where needed

## Things to Avoid

- Do not modify `node_modules/`
- Do not commit `.docusaurus/` or `build/` directories
- Do not hardcode environment-specific values
- Do not break the OpenAPI spec validation
