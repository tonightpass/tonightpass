---
"tonightpass": patch
---

Add nearby cities endpoint and SDK method. New endpoint `GET /places/countries/:countrySlug/cities/:citySlug/nearby` returns cities sorted by distance using haversine calculation. New SDK method `tnp.places.countries.cities.nearby(country, city, options)` with configurable radius and limit. Added `NearbyCitiesOptions` type.
