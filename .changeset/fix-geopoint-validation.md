---
"tonightpass": patch
---

Standardize validation across all DTOs

**GeoPoint validation fixes:**
- Replace invalid @ValidateNested() on method with proper @Validate() custom validator
- Create CoordinatesRangeConstraint for geographic coordinate validation
- Ensure coordinates are within valid latitude (-90 to 90) and longitude (-180 to 180) ranges
- Fix class-validator compatibility issues with geometry validation

**Date handling standardization:**
- Standardize all date fields to use consistent `@Transform()` + `@IsDate()` pattern
- Add automatic string-to-Date conversion with `@Transform(({ value }) => (value instanceof Date ? value : new Date(value)))`
- Replace inconsistent `@IsDateString()` usage with `@IsDate()` validation
- Apply to all DTOs: CreateOrganizationEventDto, UpdateOrganizationEventDto, ticket DTOs, and user DTOs
- Restore `@MinDate()` validations where appropriate for future date requirements