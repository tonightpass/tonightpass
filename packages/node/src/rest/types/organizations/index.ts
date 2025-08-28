import type Stripe from "stripe";

import {
  ArrayOptions,
  ArrayResult,
  Base,
  Location,
  OrganizationProfile,
} from "..";
import { OrganizationAnalyticsEndpoints } from "./analytics";
import { OrganizationEvent, OrganizationEventEndpoints } from "./events";
import { OrganizationEventTicket } from "./events/tickets";
import { OrganizationMember, OrganizationMembersEndpoints } from "./members";
import { CreateOrganizationDto, UpdateOrganizationDto } from "../../dtos";
import { Endpoint } from "../../endpoints";

export * from "./events";
export * from "./members";
export * from "./tokens";
export * from "./analytics";

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
  vatRate: number;
};

export type OrganizationBillingAccount = Stripe.Account;

export type OrganizationIdentity = OrganizationProfile;

export enum OrganizationFileType {
  Avatar = "avatar",
  Banner = "banner",
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
      "POST",
      "/organizations/:organizationSlug/files/:organizationFileType",
      string,
      FormData
    >
  | Endpoint<
      "GET",
      "/organizations/:organizationSlug/billing/account",
      OrganizationBillingAccount
    >
  | Endpoint<"GET", "/organizations/:organizationSlug/billing/link", void>
  | Endpoint<"GET", "/organizations/:organizationSlug/billing/dashboard", void>
  | OrganizationEventEndpoints
  | OrganizationMembersEndpoints
  | OrganizationAnalyticsEndpoints;
