---
"tonightpass": patch
---

Add complete organization members management SDK methods

- Add missing SDK methods for organization members management
- Remove unsafe global endpoints (GET /organizations/members, DELETE /organizations/members/:memberId)
- Implement secure organization-scoped member operations:
  - `me()` - Get user's organization memberships
  - `get(organizationSlug)` - Get organization members
  - `create(organizationSlug, data)` - Add member to organization
  - `update(organizationSlug, userId, data)` - Update member role
  - `delete(organizationSlug, userId)` - Remove member from organization