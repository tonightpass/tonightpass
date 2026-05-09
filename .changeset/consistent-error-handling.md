---
"tonightpass": patch
---

Consistent error handling: API errors now always throw `TonightPassAPIError` with `.status` and `.message`. Added `client.baseURL` public property. Fixed roadmap reactions sending featureId in body instead of path params. Removed unused `featureId` from `AddRoadmapReactionBody` type.
