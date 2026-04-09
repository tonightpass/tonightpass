---
"tonightpass": patch
---

Add `flow` property to `AuthResponse` indicating whether the authentication call resulted in a brand new account (`"signup"`) or an existing user signing back in (`"signin"`). New `AuthFlow` type is exported. Useful for analytics on OAuth providers (notably Google One Tap) where the same endpoint transparently handles both signup and signin and the client could not previously distinguish them.
