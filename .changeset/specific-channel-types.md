---
"tonightpass": patch
---

Add specific types for channel message reactions and read status tracking. Created `ChannelMessageReaction` and `ChannelMessageReadByEntry` types to replace inline object types in `ChannelMessage` for better type safety and maintainability.