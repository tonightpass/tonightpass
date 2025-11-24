---
"tonightpass": patch
---

Add AuthResponse type for mobile authentication support

- Added new `AuthResponse` type that includes user data and authentication tokens (accessToken and refreshToken)
- Updated `/auth/sign-in` and `/auth/sign-up` endpoints to return `AuthResponse` instead of `User`
- Updated Google OAuth one-tap endpoint to return `AuthResponse`
- Tokens are now included in the response body for mobile clients while continuing to be set as cookies for web browsers
- This change enables React Native apps to extract and store tokens from the API response

This is a breaking change for clients consuming the sign-in/sign-up endpoints, as the response structure has changed from:
```typescript
{ success: true, data: User }
```
to:
```typescript
{ success: true, data: { user: User, accessToken: string, refreshToken: string } }
```

Web clients using cookies for authentication are unaffected as tokens continue to be set via Set-Cookie headers.
