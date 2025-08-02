---
"tonightpass": patch
---

Use native Stripe.Invoice types instead of custom Invoice type

Removed the custom Invoice type and updated the Order type to use Stripe.Response<Stripe.Invoice> directly. This ensures proper typing for Stripe's confirmation_secret field and eliminates type conflicts.