---
"tonightpass": patch
---

Add Bearer token authentication support to SDK

- Add `accessToken` option to `ClientOptions`
- Add `setAccessToken()` method to `Client` class for dynamic token updates
- Automatically include `Authorization: Bearer <token>` header in requests when accessToken is set
- Update `/auth/refresh-token` endpoint type to return `AuthResponse` instead of `null`
- Remove redundant `setAccessToken` helper from React hooks (use `client.setAccessToken()` directly)
