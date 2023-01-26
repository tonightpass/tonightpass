import { Location } from "..";
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
  updatedAt: Date;
  createdAt: Date;
};

export type OrganizationSocialLink = {
  type: OrganizationSocialType;
  url: string;
};

export enum OrganizationSocialType {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Youtube,
  Website,
}

export type OrganizationMember = {
  user: User;
  role: OrganizationMemberRole;
  createdAt: Date;
};

export enum OrganizationMemberRole {
  Employee = "employee",
  Manager = "manager",
  Administrator = "administrator",
  Owner = "owner",
}
