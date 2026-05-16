---
"tonightpass": patch
---

Add `artists.top()` SDK method backed by a new `GET /artists/top` endpoint that returns the artists with the most Tonight Pass followers, sorted by follower count desc. Accepts a `limit` query param (default 12, max 50). Each item is an `Artist` with `tonightpass.followersCount` populated from the live DB aggregation.

New type `ListTopArtistsOptions = ArrayOptions<Artist>` exposed alongside the endpoint.
