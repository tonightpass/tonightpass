# TonightPass Documentation

This is the official documentation for the TonightPass platform and SDK.

## Table of Contents

- [TonightPass Documentation](#tonightpass-documentation)
  - [Table of Contents](#table-of-contents)
  - [Development](#development)
  - [Structure](#structure)
  - [API Reference Generation](#api-reference-generation)
  - [Deployment](#deployment)

## Development

To run the documentation site locally:

```bash
# Install dependencies
pnpm install

# Generate API reference documentation and start the development server
pnpm dev
```

The documentation will be available at [http://localhost:3000](http://localhost:3000).

## Structure

- `content/docs/`: Contains the main documentation content in MDX format
- `content/api-reference/`: Contains the auto-generated API reference documentation
- `src/`: Contains the Next.js application code
- `scripts/`: Contains utility scripts, including the API reference documentation generator

## API Reference Generation

The API reference documentation is automatically generated from the TypeScript source code using TypeDoc. This happens automatically when you run `pnpm dev` or `pnpm build`.

If you want to generate the API reference documentation manually, you can run:

```bash
pnpm generate-api-docs
```

This will:
1. Run TypeDoc on the source code in the `packages/` directory
2. Output the generated documentation to `content/api-reference/`
3. Apply necessary transformations to make the generated content compatible with Fumadocs

## Deployment

The documentation site is built using Next.js and can be deployed to any platform that supports Next.js applications, such as Vercel or Netlify.

To build the documentation for production:

```bash
pnpm build
```

The output will be in the `.next/` directory.