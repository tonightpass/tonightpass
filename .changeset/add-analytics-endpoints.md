---
"tonightpass": patch
---

Add organization analytics endpoints for dashboard MVP

- Add OrganizationAnalyticsOverview type with metrics and chart data
- Add OrganizationEventAnalytics type with basic event metrics
- Add analytics endpoints:
  - GET /organizations/:organizationSlug/analytics/overview
  - GET /organizations/:organizationSlug/analytics/events
- Add AnalyticsOptions and EventAnalyticsOptions query parameters
- Support for period filtering (7d, 30d, 90d, 12m) and custom date ranges