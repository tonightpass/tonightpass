import type { Endpoint } from "../../../endpoints";
import type { ArrayOptions, ArrayResult } from "../..";
import type { OrganizationEvent } from "../events";

// Analytics Overview Types
export type OrganizationAnalyticsOverview = {
  metrics: {
    totalRevenue: {
      current: number;
      previous: number;
      percentageChange: number;
    };
    totalOrders: {
      current: number;
      previous: number;
      percentageChange: number;
    };
    totalTicketsSold: {
      current: number;
      previous: number;
      percentageChange: number;
    };
    activeEvents: number;
  };
  chartData: {
    date: string;
    revenues: number;
    orders: number;
    ticketsSold: number;
    events: number;
  }[];
};

// Event Analytics Types
export type OrganizationEventAnalytics = {
  event: OrganizationEvent;
  metrics: {
    totalViews: number;
    uniqueViews: number;
    sessionsCount: number;
    totalRevenue: number;
    totalOrders: number;
    totalTicketsSold: number;
  };
};

// Analytics Query Options
export type AnalyticsOptions = {
  period?: "7d" | "30d" | "90d" | "12m";
  startDate?: string;
  endDate?: string;
};

export type EventAnalyticsOptions = AnalyticsOptions & {
  status?: "upcoming" | "past" | "all";
};

// Analytics Endpoints
export type OrganizationAnalyticsEndpoints =
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/analytics/overview",
      OrganizationAnalyticsOverview,
      AnalyticsOptions
    >
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/analytics/events",
      ArrayResult<OrganizationEventAnalytics>,
      ArrayOptions<OrganizationEventAnalytics> & EventAnalyticsOptions
    >;
