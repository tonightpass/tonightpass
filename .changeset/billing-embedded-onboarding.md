---
"tonightpass": minor
---

Add `organizations.billing.session`, which returns the short lived secret
Stripe's embedded components need.

It exists so an organizer can finish onboarding without leaving the dashboard.
The `link` method next to it answers a redirect to connect.stripe.com instead,
and is kept as a fallback.
