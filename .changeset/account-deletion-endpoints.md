---
"tonightpass": minor
---

Add self-service account deletion endpoints: `DELETE /users/~me` requests deletion (starts a 30-day grace period, requires a `DeleteUserDto` with a reason and optional comment) and `POST /users/~me/restore` cancels a pending deletion. Adds `UserDeletionResponse`, `UserDeletionBlockerType`, `UserDeletionReason`, and `DeleteUserDto`. Exposes `UserProfileMetadata.isAnonymized` so anonymized profiles can be noindexed.
