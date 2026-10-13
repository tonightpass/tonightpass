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
import { Currency } from "../currencies";
import type { OrganizationAnalyticsEndpoints } from "./analytics";
import type { OrganizationCustomersEndpoints } from "./customers";
import type { OrganizationEvent, OrganizationEventEndpoints } from "./events";
import type { OrganizationEventTicket } from "./events/tickets";
import type {
  OrganizationMember,
  OrganizationMembersEndpoints,
} from "./members";
import type { OrganizationNotificationEndpoints } from "./notifications";
import type { OrganizationOrdersEndpoints } from "./orders";

export * from "./analytics";
export * from "./customers";
export * from "./events";
export * from "./members";
export * from "./notifications";
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
  isPayoutsEnabled: boolean;
  vatRate: number;
};

export type OrganizationBillingAccount = Stripe.Account;

export enum OrganizationPayoutStatus {
  Paid = "paid",
  Pending = "pending",
  InTransit = "in_transit",
  Failed = "failed",
  Canceled = "canceled",
}

export type OrganizationBillingBalance = {
  balance: { amount: number; currency: Currency }[];
  pending: { amount: number; currency: Currency }[];
  payouts: {
    id: string;
    amount: number;
    currency: Currency;
    status: OrganizationPayoutStatus;
    arrival_date: number;
  }[];
};

export type OrganizationBillingPendingRevenue = {
  amount: number;
  count: number;
  currency: Currency;
}[];

/**
 * Short lived secret that lets Stripe's embedded components render inside the
 * dashboard, instead of sending the organizer to connect.stripe.com.
 *
 * Stripe expires it within the hour, so it is fetched when the screen needs it
 * rather than stored.
 */
export type OrganizationBillingSession = {
  clientSecret: string;
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
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/billing/session",
      OrganizationBillingSession
    >
  | Endpoint<"GET", "/organizations/@:organizationSlug/billing/dashboard", void>
  | OrganizationEventEndpoints
  | OrganizationMembersEndpoints
  | OrganizationAnalyticsEndpoints
  | OrganizationCustomersEndpoints
  | OrganizationNotificationEndpoints
  | OrganizationOrdersEndpoints;
