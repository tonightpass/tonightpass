---
"tonightpass": patch
---

Fix GeoPointDto validation decorators

- Replace invalid @ValidateNested() on method with proper @Validate() custom validator
- Create CoordinatesRangeConstraint for geographic coordinate validation
- Ensure coordinates are within valid latitude (-90 to 90) and longitude (-180 to 180) ranges
- Fix class-validator compatibility issues with geometry validation