---
"@tonightpass/node": minor
---

Add organization-specific channel endpoints and update channel API structure

- Update channel endpoints to support both user (@me) and organization-specific routes
- Add UserChannelCountOptions type for counting unseen channels  
- Extend channel message endpoints with organization support
- Update SDK methods to handle organization-specific channel operations
- Add proper typing for channel members and message reactions
- Improve ArrayResult and ArrayOptions usage throughout channel APIs