import { Location } from "..";
import { EventTicket } from "../event/ticket";
import { User } from "../user";

export type Organization = {
  id: string;
  name: string;
  socials: OrganizationSocial[];
  members: OrganizationMember[];
  location?: Location;
  savedTickets: EventTicket[];
  events: Event[];
  updatedAt: Date;
  createdAt: Date;
};

export type OrganizationSocial = {
  type: OrganizationSocialType;
  url: string;
};

export enum OrganizationSocialType {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Youtube,
  Website
}

export type OrganizationMember = {
  user: User;
  role: OrganizationMemberRole;
};

export enum OrganizationMemberRole {
  Owner,
  Administrator,
  Employee
}