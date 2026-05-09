---
"tonightpass": patch
---

Move currency from ticket level to event level. Added 135 Stripe-supported currencies to the Currency enum with zero-decimal and minimum charge amounts. `applyMinimumChargeableAmount()` now accepts a currency parameter. Removed `currency` from ticket DTOs.
