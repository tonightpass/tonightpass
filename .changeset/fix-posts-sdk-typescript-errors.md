---
"@tonightpass/node": patch
---

Fix TypeScript errors in posts SDK

- Fix incorrect imports for CreateUserPostCommentDto and UpdateUserPostCommentDto in comments SDK
- Fix incorrect imports for CreateUserPostRepostDto in reposts SDK  
- Fix incorrect imports for CreateUserPostDto and UpdateUserPostDto in main posts SDK
- Fix incorrect URL endpoints in reposts SDK (/repost -> /reposts)
- Fix incorrect delete method signatures (missing undefined parameter for request body)
- Reorganize imports to follow ESLint rules