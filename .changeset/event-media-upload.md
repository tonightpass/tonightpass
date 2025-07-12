---
"tonightpass": patch
---

Add event media upload functionality with support for flyers and trailers

- Add `OrganizationEventFileType` enum with Flyer and Trailer types
- Add file upload endpoint type definition for events  
- Add `uploadFile` method to events SDK for uploading media files
- Support for both image and video file uploads with proper validation