---
"tonightpass": patch
---

Add channel status system for message view states

- Add `ChannelStatus` enum with Snapchat-style message statuses:
  - `sent`: Message sent but not delivered yet
  - `delivered`: Message sent and delivered
  - `read`: Message sent and opened by recipient
  - `received`: Message received but not yet read
  - `opened`: Message received and read by user
- Add optional `status` field to `Channel` type to track last message status
- This enables status icons in the inbox channel list:
  - Gray arrow: Sent but not delivered
  - Blue filled arrow: Delivered
  - Blue outlined arrow: Read by recipient  
  - Blue filled chat bubble: Received but unread
  - Blue outlined chat bubble: Received and read