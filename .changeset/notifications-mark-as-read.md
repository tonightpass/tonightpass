---
"tonightpass": patch
---

Add automatic mark as read functionality for notifications

- Add new PUT endpoint `/users/@me/notifications/read` to mark all user notifications as read
- Add `read` method to `usersNotifications` SDK