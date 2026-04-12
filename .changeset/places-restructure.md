---
"tonightpass": patch
---

Restructure places API: split `Place` into `PlaceCountry` and `PlaceCity`, add country endpoints (`/places/countries`, `/places/countries/:countrySlug`), nest city endpoints under countries (`/places/countries/:countrySlug/cities`), add global city endpoints (`/places/cities`, `/places/cities/search`)
