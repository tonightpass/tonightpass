---
"tonightpass": patch
---

Standardize date field handling across all DTOs

- Ensure consistent `@Transform()` decorator for automatic string-to-Date conversion
- Replace mixed `@IsDateString()` and `@IsDate()` usage with standardized `@IsDate()`
- Add proper `@MinDate()` validation for future date requirements
- Apply consistent pattern: `@Transform(({ value }) => (value instanceof Date ? value : new Date(value)))`
- Fix date validation issues in event creation and user management forms