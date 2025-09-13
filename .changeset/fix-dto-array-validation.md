---
"tonightpass": patch
---

Fix DTO array validation to use proper decorators

- Replace `@Length` with `@ArrayMaxSize` for array size validation in DTOs
- `mediaUrls` in CreateUserPostDto now uses `@ArrayMinSize(1)` and `@ArrayMaxSize(10)` instead of `@Length(1, 10)`
- `links` arrays in user and organization DTOs now use `@ArrayMaxSize(5)` instead of `@Length(0, 5)`
- Add `@ArrayMaxSize(25)` limits to flyers and trailers in organization event DTOs

This ensures proper validation of array sizes rather than individual element lengths.