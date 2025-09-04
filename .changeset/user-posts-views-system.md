---
"tonightpass": patch
---

Add organized views system for user posts following events pattern

- Create `src/sdk/users/posts/views/index.ts` with `usersPostsViews` SDK module
- Create `src/rest/types/users/posts/views/index.ts` with `UserPostViewEndpoints` types
- Refactor user posts SDK to use `views: usersPostsViews(client)` instead of `addView`
- Add `UserPostViewEndpoints` to main `UserEndpoints` type union
- Export views types from user posts index
- Remove views endpoint from `UserPostEndpoints` to separate module

Now user posts views follow the same organized pattern as events:
- Events: `sdk.organizations.events.views.record(orgSlug, eventSlug)`
- Posts: `sdk.users.posts.views.record(username, postId)`