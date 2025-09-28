---
"tonightpass": patch
---

Remove debug console logs from HTTP client

Cleaned up transformRequest function by removing temporary debug console.log statements that were added during FormData header troubleshooting. The FormData handling functionality remains intact while removing unnecessary logging.