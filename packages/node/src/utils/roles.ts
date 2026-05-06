import { OrganizationMemberRolePower } from "../constants";
import type { OrganizationMemberRole } from "../rest/types/organizations/members";

/**
 * Check if a member role has at least the specified minimum role level
 * @param memberRole - The member's current role
 * @param minimumRole - The minimum required role
 * @returns true if memberRole has at least the power of minimumRole
 */
export function isMemberRoleAtLeast(
  memberRole: OrganizationMemberRole,
  minimumRole: OrganizationMemberRole
): boolean {
  return (
    OrganizationMemberRolePower[memberRole] >=
    OrganizationMemberRolePower[minimumRole]
  );
}
