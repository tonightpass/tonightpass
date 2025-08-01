import {
  ArrayOptions,
  ArrayResult,
  Base,
  OrganizationProfile,
  UserProfile,
} from "../..";
import { CreateOrganizationMemberDto } from "../../../dtos";
import { AcceptOrganizationMemberInvitationDto } from "../../../dtos/organizations/members/accept-organization-member-invitation.dto";
import { CreateOrganizationMemberInvitationLinkDto } from "../../../dtos/organizations/members/create-organization-member-invitation-link.dto";
import { UpdateOrganizationMemberDto } from "../../../dtos/organizations/members/update-organization-member.dto";
import { Endpoint } from "../../../endpoints";
import { UserToken } from "../../users/tokens";
import { OrganizationToken } from "../tokens";

export type OrganizationMember = Base & {
  organization: OrganizationProfile;
  role: OrganizationMemberRole;
  status: OrganizationMemberStatus;
  user?: UserProfile;
  token?: UserToken;
};

export enum OrganizationMemberStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}

export enum OrganizationMemberRole {
  Owner = "owner",
  Admin = "admin",
  Manager = "manager",
  Member = "member",
}

export type OrganizationMembersEndpoints =
  | Endpoint<
      "GET",
      "/organizations/members/@me",
      ArrayResult<OrganizationMember>,
      ArrayOptions<OrganizationMember>
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
      "/organizations/:organizationSlug/members/:username",
      OrganizationMember,
      UpdateOrganizationMemberDto
    >
  | Endpoint<
      "DELETE",
      "/organizations/:organizationSlug/members/:username",
      OrganizationMember[],
      null
    >
  | Endpoint<
      "GET",
      "/organizations/:organizationSlug/members/invitations/links",
      ArrayResult<OrganizationToken>,
      ArrayOptions<OrganizationToken>
    >
  | Endpoint<
      "POST",
      "/organizations/:organizationSlug/members/invitations/links",
      OrganizationToken,
      CreateOrganizationMemberInvitationLinkDto
    >
  | Endpoint<
      "POST",
      "/organizations/:organizationSlug/members/invitations/accept",
      OrganizationMember,
      AcceptOrganizationMemberInvitationDto
    >
  | Endpoint<
      "PUT",
      "/organizations/:organizationSlug/members/@me/accept",
      OrganizationMember,
      null
    >
  | Endpoint<
      "DELETE",
      "/organizations/:organizationSlug/members/@me/reject",
      null,
      null
    >
  | Endpoint<
      "DELETE",
      "/organizations/:organizationSlug/members/@me",
      null,
      null
    >;
