---
"tonightpass": patch
---

Add organization invitation endpoints and reorganize SDK structure:
- GET /organizations/:organizationSlug/members/invitations/links - list invitation links
- POST /organizations/:organizationSlug/members/invitations/links - create invitation link
- POST /organizations/:organizationSlug/members/invitations/accept - accept with token
- PUT /organizations/:organizationSlug/members/@me/accept - accept direct invitation
- DELETE /organizations/:organizationSlug/members/@me/reject - reject direct invitation

SDK reorganized with invitations sub-module:
- tnp.organizations.members.invitations.getLinks()
- tnp.organizations.members.invitations.createLink()
- tnp.organizations.members.invitations.accept()
- tnp.organizations.members.accept()
- tnp.organizations.members.reject()