---
"tonightpass": patch
---

Add missing validation decorators to CreateOrganizationEventOrderDto

- Added @IsArray() and @IsString({ each: true }) decorators to cart field
- Fixes validation error when creating orders due to missing property validation