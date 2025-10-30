---
"tonightpass": patch
---

Add role hierarchy utilities and constants

- Add `OrganizationMemberRolePower` and `UserRolePower` constants to define role hierarchy
- Add `isMemberRoleAtLeast()` utility function to check if a member role has at least the specified minimum role level
- Export role constants from package for use in both frontend and backend
