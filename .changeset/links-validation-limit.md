---
"tonightpass": patch
---

Add maximum 5 links validation for user and organization DTOs

- Added `@Length(0, 5)` validation to user and organization links fields
- Updated validation messages to use proper error handling
- Ensures consistent limits across user profiles and organizations