import { Location, Profile, ProfileMetadata } from "..";
import { CreateOrganizationDto, UpdateOrganizationDto } from "../../dtos";
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
  updatedAt: Date;
  createdAt: Date;
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
  user: User;
  organization: Organization;
  role: OrganizationMemberRole;
  status: OrganizationMemberStatus;
  updatedAt: Date;
  createdAt: Date;
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
  | Endpoint<"GET", "/organizations/:id", Organization>
  | Endpoint<"POST", "/organizations", Organization, CreateOrganizationDto>
  | Endpoint<"PUT", "/organizations/:id", Organization, UpdateOrganizationDto>
  | Endpoint<"DELETE", "/organizations/:id", boolean>;
