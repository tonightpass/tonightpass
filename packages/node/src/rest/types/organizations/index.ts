import type Stripe from "stripe";

import {
  ArrayOptions,
  ArrayResult,
  Base,
  Location,
  OrganizationProfile,
} from "..";
import { OrganizationEvent, OrganizationEventEndpoints } from "./events";
import { OrganizationEventTicket } from "./events/tickets";
import { OrganizationMember, OrganizationMembersEndpoints } from "./members";
import { CreateOrganizationDto, UpdateOrganizationDto } from "../../dtos";
import { Endpoint } from "../../endpoints";

export * from "./events";
export * from "./members";

export type Organization = Base & {
  slug: string;
  identity: OrganizationIdentity;
  members: OrganizationMember[];
  location?: Location;
  events: OrganizationEvent[];
  savedTickets: OrganizationEventTicket[];
  verified: boolean;
  billing: OrganizationBilling;
};

export type OrganizationBilling = {
  account: string;
};

export type OrganizationBillingAccount = Stripe.Account;

export type OrganizationIdentity = OrganizationProfile & {
  socialLinks: OrganizationSocialLink[];
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

export type OrganizationEndpoints =
  | Endpoint<
      "GET",
      "/organizations/search",
      Organization[],
      { q: string; limit?: number }
    >
  | Endpoint<
      "GET",
      "/organizations",
      ArrayResult<Organization>,
      ArrayOptions<Organization>
    >
  | Endpoint<"GET", "/organizations/:organizationSlug", Organization>
  | Endpoint<"POST", "/organizations", Organization, CreateOrganizationDto>
  | Endpoint<
      "PUT",
      "/organizations/:organizationSlug",
      Organization,
      UpdateOrganizationDto
    >
  | Endpoint<"DELETE", "/organizations/:organizationSlug", Organization, null>
  | Endpoint<
      "GET",
      "/organizations/:organizationSlug/billing/account",
      OrganizationBillingAccount
    >
  | Endpoint<"GET", "/organizations/:organizationSlug/billing/link", void>
  | Endpoint<"GET", "/organizations/:organizationSlug/billing/dashboard", void>
  | OrganizationEventEndpoints
  | OrganizationMembersEndpoints;
