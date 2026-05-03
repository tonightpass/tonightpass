import type Stripe from "stripe";
import type { CreateOrganizationDto, UpdateOrganizationDto } from "../../dtos";
import type { Endpoint } from "../../endpoints";
import type {
  ArrayOptions,
  ArrayResult,
  Base,
  Location,
  OrganizationProfile,
} from "..";
import type { OrganizationAnalyticsEndpoints } from "./analytics";
import type { OrganizationCustomersEndpoints } from "./customers";
import type { OrganizationEvent, OrganizationEventEndpoints } from "./events";
import type { OrganizationEventTicket } from "./events/tickets";
import type {
  OrganizationMember,
  OrganizationMembersEndpoints,
} from "./members";
import type { OrganizationOrdersEndpoints } from "./orders";

export * from "./analytics";
export * from "./customers";
export * from "./events";
export * from "./members";
export * from "./orders";
export * from "./tokens";

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

export type OrganizationBillingBalance = {
  balance: { amount: number; currency: string }[];
  pending: { amount: number; currency: string }[];
  payouts: {
    id: string;
    amount: number;
    currency: string;
    status: string;
    arrival_date: number;
  }[];
};

export type OrganizationBillingPendingRevenue = {
  amount: number;
  count: number;
};

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
  | Endpoint<"GET", "/organizations/@:organizationSlug", Organization>
  | Endpoint<"POST", "/organizations", Organization, CreateOrganizationDto>
  | Endpoint<
      "PUT",
      "/organizations/@:organizationSlug",
      Organization,
      UpdateOrganizationDto
    >
  | Endpoint<
      "DELETE",
      "/organizations/@:organizationSlug",
      Organization,
      undefined
    >
  | Endpoint<
      "POST",
      "/organizations/@:organizationSlug/files/:organizationFileType",
      string,
      FormData
    >
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/billing/account",
      OrganizationBillingAccount
    >
  | Endpoint<"GET", "/organizations/@:organizationSlug/billing/link", void>
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/billing/balance",
      OrganizationBillingBalance
    >
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/billing/pending",
      OrganizationBillingPendingRevenue
    >
  | Endpoint<"GET", "/organizations/@:organizationSlug/billing/dashboard", void>
  | OrganizationEventEndpoints
  | OrganizationMembersEndpoints
  | OrganizationAnalyticsEndpoints
  | OrganizationCustomersEndpoints
  | OrganizationOrdersEndpoints;
