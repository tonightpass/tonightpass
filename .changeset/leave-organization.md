---
"tonightpass": patch
---

Add endpoint to leave an organization and update member endpoints to use username instead of userId:
- DELETE /organizations/:organizationSlug/members/@me
- PUT /organizations/:organizationSlug/members/:username (was :userId)
- DELETE /organizations/:organizationSlug/members/:username (was :userId)