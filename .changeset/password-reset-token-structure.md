---
"tonightpass": patch
---

Update password recovery token structure to use tokenId and tokenValue fields

- Changed RecoveryResetDto to use `tokenId` and `tokenValue` instead of `token` and `tokenId`
- Updated URL parameters to use `id` and `value` for better semantic naming
- Improved token validation security by requiring both token ID and value