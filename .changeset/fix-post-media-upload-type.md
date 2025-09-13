---
"tonightpass": patch
---

Fix user post media upload endpoint return type

- Change `/users/@me/posts/media` endpoint to return a string (URL) instead of UserPostMedia object
- This endpoint uploads media temporarily and returns the CDN URL for later use in post creation