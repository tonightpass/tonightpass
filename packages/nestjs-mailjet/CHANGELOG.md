# @tonightpass/nestjs-mailjet

## 4.0.8

### Patch Changes

- [#1002](https://github.com/tonightpass/tonightpass/pull/1002) [`41470b3`](https://github.com/tonightpass/tonightpass/commit/41470b3d6f569f70dde8bdc769166d386a6cd8a1) Thanks [@antoinekm](https://github.com/antoinekm)! - Fix Mailjet client configuration and improve TypeScript types
  - Fix client initialization to properly handle sandbox mode configuration
  - Replace `any` type with proper `ClientParams` type from node-mailjet
  - Remove problematic `perform_api_call` configuration that was causing email delivery issues
  - Simplify client configuration to use Mailjet defaults for better compatibility
  - Fix sender validation issues by using proper API configuration

## 4.0.7

### Patch Changes

- [`c2f7c66`](https://github.com/tonightpass/tonightpass/commit/c2f7c6621c6c639db82e29f59c662d4102eb15b1) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Update build strategy

## 4.0.6

### Patch Changes

- [`8f2ab17`](https://github.com/tonightpass/tonightpass/commit/8f2ab1741dacc6721484bce7629cca2c3c89a8bf) Thanks [@AntoineKM](https://github.com/AntoineKM)! - Enhance package.json

## 3.0.3

### Patch Changes

- Fix Mailjet API breaking changes

## 3.0.2

### Patch Changes

- Update sendEmail error throwing conditions

## 3.0.1

### Patch Changes

- 8e9b87f: Update dependencies versions

## 3.0.0

### Major Changes

- f0e7039: Fix MailjetService provider

## 2.0.0

### Major Changes

- af4cf6f: Add types and security
