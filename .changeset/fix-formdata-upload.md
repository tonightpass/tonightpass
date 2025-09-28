---
"tonightpass": patch
---

Fix FormData upload handling in HTTP client

Fixed an issue where FormData uploads were failing due to incorrect Content-Type header management. The transformRequest function now properly handles the Content-Type header by only setting it to "application/json" for non-FormData requests, allowing the browser to automatically set the correct multipart/form-data Content-Type with proper boundaries for file uploads.