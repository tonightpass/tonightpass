import { OrganizationMemberRole, UserRole } from "../rest";

export const OrganizationMemberRolePower: {
  [key in OrganizationMemberRole]: number;
} = {
  [OrganizationMemberRole.Owner]: 3,
  [OrganizationMemberRole.Admin]: 2,
  [OrganizationMemberRole.Manager]: 1,
  [OrganizationMemberRole.Member]: 0,
};

export const UserRolePower: { [key in UserRole]: number } = {
  [UserRole.Admin]: 2,
  [UserRole.Developer]: 1,
  [UserRole.User]: 0,
};
