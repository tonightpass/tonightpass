---
"tonightpass": patch
---

Improved type safety by using UserProfile and OrganizationProfile types instead of full User and Organization entities in public-facing API types. This prevents exposure of sensitive data like passwords, internal IDs, and private settings through the type system.

Changes:
- Updated notification types to use UserProfile for follower field
- Updated organization event types to use OrganizationProfile
- Updated organization member types to use profile types
- Fixed various endpoint type definitions to return profile types instead of full entities
- Maintained full User/Organization types only where appropriate (auth endpoints, internal operations)