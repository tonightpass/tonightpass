---
"tonightpass": minor
---

Update URL validation patterns, add file upload endpoints and message reporting

- Add new file upload endpoints for channel message attachments
- Update all DTO validations to use strict CDN URL patterns with flexible ID formats
- Replace `@IsUrl()` with `@Matches()` for more precise validation
- Add support for temp and permanent S3 bucket paths
- Update message DTOs to use string arrays for attachments instead of complex objects
- Make message content optional when attachments are provided
- Add message reporting endpoints with comprehensive reason categories
- Add ChannelMessageReportReason enum with 16 specific report categories
- Add SDK methods for file upload and message reporting (uploadFile, uploadFileByOrganization, report, reportByOrganization)