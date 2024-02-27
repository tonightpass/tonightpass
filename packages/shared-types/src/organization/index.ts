import { Location } from "..";
import { Event } from "../event";
import { EventTicket } from "../event/ticket";
import { User } from "../user";

export type Organization = {
  id: string;
  name: string;
  slug: string;
  members: OrganizationMember[];
  logoUrl: string;
  socialLinks: OrganizationSocialLink[];
  location?: Location;
  events: Event[];
  savedTickets: EventTicket[];
  verified: boolean;
  updatedAt: Date;
  createdAt: Date;
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
