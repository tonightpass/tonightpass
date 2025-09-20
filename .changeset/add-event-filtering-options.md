---
"tonightpass": patch
---

Add types and styles filtering support to OrganizationEventArrayOptions

- Add `types` parameter to filter events by OrganizationEventType
- Add `styles` parameter to filter events by style IDs or slugs
- Update `/organizations/events` endpoint to use OrganizationEventArrayOptions
- Support both single values and arrays for filtering parameters