---
"tonightpass": patch
---

Add temporary file upload support for user avatars during signup

- Added `/users/files/:userFileType` endpoint for uploading temporary files
- Added `uploadTempFile` method to users SDK for handling temporary avatar uploads