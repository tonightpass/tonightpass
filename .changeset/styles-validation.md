---
"tonightpass": patch
---

Add validation to require at least one style for organization events

- Replace `@IsNotEmpty()` with `@ArrayMinSize(1)` for styles field in CreateOrganizationEventDto
- Ensures events must have at least one style selected before creation
- Prevents creation of events with empty styles array