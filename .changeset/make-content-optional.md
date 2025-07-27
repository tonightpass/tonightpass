---
"tonightpass": patch
---

Make content field optional in ChannelMessage entity and types. The content field is now nullable in the database entity and optional in TypeScript types, allowing messages to be created with only attachments and no text content.