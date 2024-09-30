import { Organization } from "..";
import { ArrayOptions, ArrayResult, Base } from "../..";
import { CreateOrganizationMemberDto } from "../../../dtos";
import { UpdateOrganizationMemberDto } from "../../../dtos/organizations/members/update-organization-member.dto";
import { Endpoint } from "../../../endpoints";
import { UserToken } from "../../token";
import { User } from "../../users";

export type OrganizationMember = Base & {
  organization: Organization;
  role: OrganizationMemberRole;
  status: OrganizationMemberStatus;
  user?: User;
  token?: UserToken;
};

export enum OrganizationMemberStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}

export enum OrganizationMemberRole {
  Member = "member",
  Manager = "manager",
  Admin = "admin",
  Owner = "owner",
}

export type OrganizationMembersEndpoints =
  | Endpoint<
      "GET",
      "/organizations/members",
      ArrayResult<OrganizationMember>,
      ArrayOptions<OrganizationMember>
    >
  | Endpoint<
      "GET",
      "/organizations/members/me",
      ArrayResult<OrganizationMember>,
      ArrayOptions<OrganizationMember>
    >
  | Endpoint<
      "DELETE",
      "/organizations/members/:memberId",
      OrganizationMember[],
      null
    >
  | Endpoint<
      "GET",
      "/organizations/:organizationSlug/members",
      ArrayResult<OrganizationMember>,
      ArrayOptions<OrganizationMember>
    >
  | Endpoint<
      "POST",
      "/organizations/:organizationSlug/members",
      OrganizationMember,
      CreateOrganizationMemberDto
    >
  | Endpoint<
      "PUT",
      "/organizations/:organizationSlug/members/:userId",
      OrganizationMember,
      UpdateOrganizationMemberDto
    >
  | Endpoint<
      "DELETE",
      "/organizations/:organizationSlug/members/:userId",
      OrganizationMember[],
      null
    >;
