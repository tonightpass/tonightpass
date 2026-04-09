---
"tonightpass": patch
---

Add `normalizeAddress` helper and apply it as a `class-transformer` `@Transform` on `CreateLocationDto.address` and `UpdateLocationDto.address`. This strips trailing `zipCode`, `city`, and `country` segments that some clients (notably Mapbox Search Box for POIs) bake into the address string, preventing duplicated formatted addresses from being persisted.
