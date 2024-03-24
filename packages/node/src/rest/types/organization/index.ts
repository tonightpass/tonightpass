import { Location, Profile, ProfileMetadata } from "..";
import { Event } from "../event";
import { EventTicket } from "../event/ticket";
import { User } from "../user";

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
  role: OrganizationMemberRole;
  createdAt: Date;
};

export enum OrganizationMemberRole {
  EMPLOYEE = 0,
  MANAGER = 1,
  ADMINISTRATOR = 2,
  OWNER = 3,
}
