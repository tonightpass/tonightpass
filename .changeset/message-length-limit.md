---
"tonightpass": patch
---

Reduce message content length limit from 4000 to 1024 characters and remove attachment updates

- Update CreateChannelMessageDto content length validation from 4000 to 1024 characters
- Update UpdateChannelMessageDto content length validation from 4000 to 1024 characters  
- Remove attachments field from UpdateChannelMessageDto to prevent attachment modifications after message creation
- Improve message length consistency across the platform