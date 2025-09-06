---
"tonightpass": patch
---

Update CreateUserPostDto to require at least 1 media

- Changed mediaIds validation from `@Length(0, 10)` to `@Length(1, 10)`
- Posts now require at least 1 media (photo or video)
- Content remains optional
- Maximum of 10 media items per post