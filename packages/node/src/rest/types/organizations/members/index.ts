import { Organization } from "..";
import { Base } from "../..";
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
  | Endpoint<"GET", "/organizations/members", OrganizationMember[]>
  | Endpoint<"DELETE", "/organizations/members/:id", OrganizationMember[], null>
  | Endpoint<"GET", "/organizations/:slug/members", OrganizationMember[]>
  | Endpoint<
      "POST",
      "/organizations/:slug/members",
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
