import { Location, Profile, ProfileMetadata, UserToken } from "..";
import {
  CreateOrganizationDto,
  OrganizationMemberDto,
  UpdateOrganizationDto,
} from "../../dtos";
import { UpdateOrganizationMemberDto } from "../../dtos/organizations/members/update-organization-member.dto";
import { Endpoint } from "../../endpoints";
import { Event } from "../event";
import { EventTicket } from "../event/ticket";
import { User } from "../users";

export type Organization = {
  id: string;
  slug: string;
  identity: OrganizationIdentity;
  members: OrganizationMember[];
  location?: Location;
  events: Event[];
  savedTickets: EventTicket[];
  verified: boolean;
  billing: OrganizationBilling;
  updatedAt: Date;
  createdAt: Date;
};

export type OrganizationBilling = {
  account: string;
};

export type OrganizationIdentity = Profile & {
  socialLinks: OrganizationSocialLink[];

  metadata: ProfileMetadata & {
    eventsCount: number;
    viewsCount: number;
    membersCount: number;
  };
};

export type OrganizationSocialLink = {
  type: OrganizationSocialType;
  url: string;
};

export enum OrganizationSocialType {
  Facebook = "facebook",
  Twitter = "twitter",
  Instagram = "instagram",
  Linkedin = "linkedin",
  Youtube = "youtube",
  Website = "website",
}

export type OrganizationMember = {
  organization: Organization;
  role: OrganizationMemberRole;
  status: OrganizationMemberStatus;
  updatedAt: Date;
  createdAt: Date;
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

export type OrganizationEndpoints =
  | Endpoint<"GET", "/organizations", Organization[]>
  | Endpoint<"GET", "/organizations/:slug", Organization>
  | Endpoint<"POST", "/organizations", Organization, CreateOrganizationDto>
  | Endpoint<"PUT", "/organizations/:slug", Organization, UpdateOrganizationDto>
  | Endpoint<"DELETE", "/organizations/:slug", boolean, null>
  | Endpoint<"GET", "/organizations/members", OrganizationMember[]>
  | Endpoint<"DELETE", "/organizations/members/:id", OrganizationMember[], null>
  | Endpoint<"GET", "/organizations/:slug/members", OrganizationMember[]>
  | Endpoint<
      "POST",
      "/organizations/:slug/members",
      OrganizationMember,
      OrganizationMemberDto
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
    >
  | Endpoint<"GET", "/organizations/:slug/billing/link", void>
  | Endpoint<"GET", "/organizations/:slug/billing/dashboard", void>;
