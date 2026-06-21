import type { Endpoint } from "../../../endpoints";
import type { ArrayOptions, ArrayResult } from "../..";
import type { OrganizationEvent } from "../events";

// A metric compared across two periods. `percentageChange` is null when the
// previous period was empty but the current one is not (growth from zero,
// rendered as an infinite increase).
export type AnalyticsMetric = {
  current: number;
  previous: number;
  percentageChange: number | null;
};

// Shared fields of a daily analytics chart point. Each overview appends its own
// trailing series (`events` for the organization, `views` for a single event).
export type AnalyticsChartPoint = {
  date: string;
  revenues: number;
  orders: number;
  ticketsSold: number;
};

export type OrganizationAnalyticsOverview = {
  metrics: {
    totalRevenue: AnalyticsMetric;
    totalOrders: AnalyticsMetric;
    totalTicketsSold: AnalyticsMetric;
    activeEvents: number;
  };
  chartData: (AnalyticsChartPoint & { events: number })[];
};

// Event Analytics Types
export type OrganizationEventAnalytics = {
  event: OrganizationEvent;
  metrics: {
    views: number;
    visits: number;
    visitors: number;
    totalRevenue: number;
    totalOrders: number;
    totalTicketsSold: number;
  };
};

// Per-event analytics overview: same metric/chart shape as the org overview,
// scoped to a single event (4th metric is views instead of active events).
export type OrganizationEventAnalyticsOverview = {
  metrics: {
    totalRevenue: AnalyticsMetric;
    totalOrders: AnalyticsMetric;
    totalTicketsSold: AnalyticsMetric;
    views: AnalyticsMetric;
  };
  chartData: (AnalyticsChartPoint & { views: number })[];
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
    >
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/events/:eventSlug/analytics/overview",
      OrganizationEventAnalyticsOverview,
      AnalyticsOptions
    >;
