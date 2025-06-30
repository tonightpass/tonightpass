---
"tonightpass": patch
---

Add chat system with channels and messages

- Add Channel and ChannelMessage types with full TypeScript support
- Support for private (2 participants) and group channels (up to 50 participants)
- **Profile-based participants**: Both users and organizations can participate as ChannelParticipant = Profile
- Rich messaging features: attachments, mentions, replies, reactions, read receipts
- Comprehensive DTOs with validation for all operations (AddParticipantDto, AddReactionDto, etc.)
- Complete SDK client methods for channels and messages CRUD operations
- Channel member management with role-based permissions
- Message editing, deletion, and reaction capabilities
- Type-safe endpoint definitions and proper validation schemas