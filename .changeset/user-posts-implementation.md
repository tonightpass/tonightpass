---
"tonightpass": patch
---

Add user posts, reposts and comments types and SDK

- Add UserPost, UserPostRepost, UserPostComment types with social media architecture
- Add UserPostMedia with AI-generated descriptions and NSFW flagging support  
- Add complete DTOs for creating and updating posts, comments, and reposts
- Add comprehensive SDK methods for posts, comments, and reposts management
- Add endpoints for posts (/users/:username/posts) and reposts (/users/:username/reposts) separation
- Add media upload endpoint with pre-processing support
- Add view tracking similar to organization events