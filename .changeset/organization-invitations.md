---
"tonightpass": patch
---

Add organization invitation system with links and acceptance endpoints

- Added `OrganizationToken` type for invitation tokens
- Added `CreateOrganizationMemberInvitationLinkDto` for creating invitation links with optional role
- Added `AcceptOrganizationMemberInvitationDto` for accepting invitations with token
- Added SDK methods `createInvitationLink()` and `acceptInvitation()` 
- Added endpoints:
  - `POST /organizations/:organizationSlug/members/invitations/links` - Create invitation link
  - `POST /organizations/:organizationSlug/members/invitations/accept` - Accept invitation
- Enhanced organization member management with secure token-based invitations