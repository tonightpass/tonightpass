---
"tonightpass": patch
---

Add validation to ensure at least one media (flyer or trailer) is required for organization events

- Add `@AtLeastOneMedia()` validator to CreateOrganizationEventDto
- Add `@AtLeastOneMediaOnUpdate()` validator to UpdateOrganizationEventDto  
- Add backend validation in organization-event.service.ts
- Frontend validation with disabled button and toast error message
- Prevents creation/update of events without any media files