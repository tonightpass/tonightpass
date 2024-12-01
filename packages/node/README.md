# TonightPass SDK Documentation

Welcome to the TonightPass SDK documentation. This SDK provides a comprehensive set of tools to interact with the TonightPass API.

## Installation

```bash
npm install tonightpass
# or
yarn add tonightpass
# or
pnpm add tonightpass
```

## Quick Start

```typescript
import { TonightPass } from 'tonightpass';

const client = new TonightPass({
  baseURL: 'https://api.tonightpass.com'
});

// Authentication
await client.auth.signIn({
  identifier: 'username',
  password: 'password'
});

// Get user profile
const profile = await client.profiles.get('username');
```

## Available Packages

* `@tonightpass/node` - Node.js SDK
* `@tonightpass/react` - React SDK
* `@tonightpass/nest` - NestJS SDK
* `@tonightpass/nestjs-mailjet` - NestJS Mailjet Module

## Features

* Full TypeScript support
* Authentication and user management
* Organization management
* Event management
* Ticket handling
* Profile management
* Real-time updates
* File uploads
* Webhook handling

## Documentation Structure

This documentation is organized into the following sections:

* **Client** - Core client implementation and configuration
* **SDK** - Main SDK modules and functionality
* **Authentication** - Authentication and authorization
* **Organizations** - Organization management
* **Events** - Event handling and management
* **Users** - User management and profiles
* **Utils** - Utility functions and helpers

## Contributing

For information about contributing to TonightPass, please see our [Contributing Guide](https://github.com/tonightpass/tonightpass/blob/master/CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/tonightpass/tonightpass/blob/master/LICENSE) file for details.

## Support

For support, please visit:

* [GitHub Issues](https://github.com/tonightpass/tonightpass/issues)
* [Documentation](https://docs.tonightpass.com)
* [Discord Community](https://discord.gg/VvvAkPqQ98)
