---
"tonightpass": patch
---

Fix PUT and DELETE requests with empty body causing "Body cannot be empty when content-type is set to 'application/json'" error. Changed body from `undefined` to `null` for endpoints that don't require a request body.
