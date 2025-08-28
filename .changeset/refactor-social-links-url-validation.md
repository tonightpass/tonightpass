---
"tonightpass": patch
---

**BREAKING CHANGE**: Refactored social links structure with URL validation

- Removed `OrganizationSocialLink` type and `OrganizationSocialType` enum
- Removed `socialLinks` property from `OrganizationIdentity` 
- Added `links: string[]` property to `BaseProfile` (available for both Users and Organizations)
- Updated DTOs with URL validation:
  - `UpdateOrganizationIdentityDto`: Changed `socialLinks?: OrganizationSocialLink[]` to `links?: string[]` with `@IsUrl({}, { each: true })`
  - `CreateOrganizationIdentityDto`: Changed `socialLinks?: OrganizationSocialLink[]` to `links?: string[]` with `@IsUrl({}, { each: true })`
  - `UpdateUserIdentityDto`: Added `links?: string[]` with `@IsUrl({}, { each: true })`
  - `CreateUserIdentityDto`: Added `links?: string[]` with `@IsUrl({}, { each: true })`

Migration guide:
- Replace `organization.identity.socialLinks` with `organization.identity.links`
- Replace `user.identity.socialLinks` with `user.identity.links` 
- Remove type information from links - detection should be done on frontend based on URL patterns
- Links are now simple string arrays containing URLs with proper URL validation
- All links must be valid URLs (enforced by @IsUrl validator)