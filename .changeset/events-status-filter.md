---
"tonightpass": patch
---

Add status filter parameter to organization events endpoint

- Added optional `status` parameter to `/organizations/:organizationSlug/events` endpoint to filter events by their status (Upcoming, Ongoing, Ended)
- The parameter accepts either a single `OrganizationEventStatus` value or an array of statuses for multiple status filtering