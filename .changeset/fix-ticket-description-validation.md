---
"tonightpass": patch
---

Fix ticket description validation to be truly optional

- Changed `@Length(1, 1024)` to `@Length(0, 1024)` in CreateOrganizationEventTicketDto
- Changed `@Length(1, 1024)` to `@Length(0, 1024)` in UpdateOrganizationEventTicketDto
- This allows ticket descriptions to be empty strings, making them truly optional