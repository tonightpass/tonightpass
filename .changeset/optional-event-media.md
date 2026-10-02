---
"tonightpass": patch
---

Make event media optional. The create and update DTOs no longer require at
least one flyer or trailer, so an organizer can publish a soirée before the
flyer is ready.

Shipped as a patch rather than a minor on purpose: the apps depend on
`^0.2.0`, so a patch reaches production on the next install without an
explicit version bump in each repo. The website already treated media as
optional, which left the two sides disagreeing and made publish fail with an
unexplained "Validation failed".
