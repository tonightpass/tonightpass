import { Address } from "..";
import { EventTicket } from "../event/ticket";
import { User } from "../user";

// Organization
export type Organization = {
  id: string;
  name: string;
  socials: OrganizationSocial[];
  members: OrganizationMember[];
  address?: Address;
  savedTickets: EventTicket[];
  events: Event[];
  updatedAt: Date;
  createdAt: Date;
};

export type OrganizationSocial = {
  type: OrganizationSocialType;
  url: string;
};

export type OrganizationSocialType = "facebook" | "twitter" | "instagram" | "linkedin" | "youtube" | "website" | string;

export type OrganizationMember = {
  user: User;
  role: OrganizationMemberRole;
};

export type OrganizationMemberRole = unknown; // missing type