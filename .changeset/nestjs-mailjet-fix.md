---
"@tonightpass/nestjs-mailjet": patch
---

Fix Mailjet client configuration and improve TypeScript types

- Fix client initialization to properly handle sandbox mode configuration
- Replace `any` type with proper `ClientParams` type from node-mailjet
- Remove problematic `perform_api_call` configuration that was causing email delivery issues
- Simplify client configuration to use Mailjet defaults for better compatibility
- Fix sender validation issues by using proper API configuration