---
"tonightpass": patch
---

Fix FormData Content-Type header handling with normalized headers

Improved FormData upload handling in the HTTP client by normalizing all header keys to lowercase and properly removing content-type headers. This ensures that FormData requests allow the browser to set the correct multipart/form-data Content-Type with proper boundaries, fixing file upload issues that were causing JSON parsing errors.