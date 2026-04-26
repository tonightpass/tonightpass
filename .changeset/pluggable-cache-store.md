---
"tonightpass": patch
---

Add pluggable cache store system with `CacheStore` interface, allowing custom implementations (Redis, etc.) via `cache.store` option. Default `MemoryCacheStore` now enforces a max size (default 1000 entries) with FIFO eviction to prevent unbounded memory growth.
