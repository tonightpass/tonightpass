---
"tonightpass": patch
---

Add in-memory cache support to the REST client

- Add `CacheManager` class for managing HTTP request cache
- Add `cache` option to `ClientOptions` with configurable TTL and methods
- Cache GET requests by default to reduce API calls during build time
- Add `clearCache()` and `getCacheStats()` methods to Client
