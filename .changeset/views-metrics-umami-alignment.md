---
"tonightpass": patch
---

Align view metrics with Umami's vocabulary on `OrganizationEvent`, `UserPost.metrics`, and `Organization.identity.metadata`:

- Rename `totalViewsCount` → `viewsCount` (raw event count, increments on every POST /views including heartbeats).
- Rename `viewsCount` → `visitsCount` (unique sessions over a 1-hour rolling window).
- Rename `sessionsCount` → `visitorsCount` (unique sessionId+IP over a 30-day rolling window).
- Add `bouncesCount` (visits with exactly one event) on events and posts.
- Add `totalDurationSeconds` (cumulative active time across non-bouncing visits) on events and posts.
- Add computed getters `averageViewsPerVisitorCount`, `bounceRate`, `averageVisitDurationSeconds`.
- Update `OrganizationEventViewResult` and `UserPostViewResult` SSE payloads to expose `visitsCount` instead of `viewsCount` (the metric used for live display).

Breaking change for any consumer reading these fields by their previous names.
