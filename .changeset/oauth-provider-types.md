---
"tonightpass": patch
---

Add OAuth provider types and improve authentication system

- Added `UserOAuthProvider` type to properly track OAuth connections with metadata
- Added `OAuth2Provider` enum with CamelCase values (Google, Facebook, Apple, Twitter)
- Removed legacy OAuth provider fields from `UserIdentifier` (google, facebook, apple, twitter)
- Added generic OAuth2 endpoints with provider parameters to reduce duplication
- Added `OAuth2ProviderParams` type for endpoint parameter typing
- OAuth providers now stored in `oauthProviders` array on User type with full metadata including:
  - provider (enum)
  - providerId (unique ID from provider)
  - displayName
  - username
  - email
  - emailVerified
  - lastUsedAt