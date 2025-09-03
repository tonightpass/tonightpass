---
"tonightpass": patch
---

Refactor user posts DTOs organization and validation

**Breaking Changes:**
- Moved all user posts DTOs from `/rest/types/` to `/rest/dtos/` following proper separation of concerns
- Converted type definitions to class-validator classes for better runtime validation

**New Structure:**
- `CreateUserPostDto`, `UpdateUserPostDto` → `/rest/dtos/users/posts/`
- `CreateUserPostCommentDto`, `UpdateUserPostCommentDto` → `/rest/dtos/users/posts/comments/`
- `CreateUserPostRepostDto` → `/rest/dtos/users/posts/reposts/`

**Validation Improvements:**
- Added proper string length limits (posts: 1-500 chars, comments/reposts: 1-280 chars)
- Added array size validation for media IDs (0-10 items max)
- Enhanced type safety with class-validator decorators

**Code Organization:**
- Split large type files into focused modules (posts, comments, reposts, media)
- Improved import paths and module exports
- Better separation between DTOs (data transfer) and types (domain models)