---
"@tonightpass/node": patch
---

Update channel message attachment validation regex

- Update attachment validation regex to only accept private channel attachment paths
- Restrict to pattern: `channels/[channelId]/messages/[messageId]/private/[uniqueHash]`