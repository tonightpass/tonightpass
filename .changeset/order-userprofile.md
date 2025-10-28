---
"tonightpass": patch
---

Change Order user field from User to UserProfile for better security

- Changed `Order.user` from `User` to `UserProfile` to only expose public user information
- Prepares for future multi-user payment system where users should only see public profiles
