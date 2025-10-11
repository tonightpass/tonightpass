---
"tonightpass": patch
---

Add search and list endpoints for profiles and events

- Add `profiles.getAll()` method to list all profiles with pagination support
- Add `profiles.search(query, options?)` method to search profiles with pagination support
- Update `organizations.events.search()` to support full pagination options instead of just limit
- Add proper TypeScript types for all new endpoints (`SearchProfilesOptions`, `SearchOrganizationEventsOptions`)
- All search endpoints now return `ArrayResult` with consistent pagination support
