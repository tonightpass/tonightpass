---
"tonightpass": patch
---

Add `isPayoutsEnabled` to the `OrganizationBilling` type. Reflects whether the organization's Stripe Connect account can actually receive funds (transfers capability active), so order routing can defer transfers until onboarding completes instead of failing on un-activated accounts.
