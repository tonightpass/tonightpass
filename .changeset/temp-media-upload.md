---
"tonightpass": patch
---

Add temporary media upload endpoint for event creation

- Add new `/events/files/:eventFileType` endpoint type definition
- Rename `uploadFile` to `uploadOrganizationFile` for organization-specific uploads
- Add new `uploadFile` method for temporary uploads without organization context
- Support uploading media files to temporary storage before event creation
- Enables media upload for non-authenticated users during event creation flow