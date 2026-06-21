---
"tonightpass": patch
---

Add per-event analytics overview endpoint `GET /organizations/@:organizationSlug/events/:eventSlug/analytics/overview` returning `OrganizationEventAnalyticsOverview` (revenue, orders, tickets sold and views metrics with period comparison, plus a daily chart series).

Factor the shared analytics shapes into `AnalyticsMetric` (`{ current, previous, percentageChange }`) and `AnalyticsChartPoint` (`{ date, revenues, orders, ticketsSold }`), reused by both the organization and event overviews. `OrganizationAnalyticsOverview` metric `percentageChange` is now `number | null` to match the API (null represents growth from an empty previous period).
