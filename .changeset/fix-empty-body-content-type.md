---
"tonightpass": patch
---

Fix Content-Type header handling for empty body requests. Previously, the `Content-Type: application/json` header was set as a default header on all requests, causing Fastify to throw "Body cannot be empty when content-type is set to 'application/json'" error for POST/DELETE requests without a body. Now the Content-Type header is only set dynamically in transformRequest when there is actual JSON data to send.
