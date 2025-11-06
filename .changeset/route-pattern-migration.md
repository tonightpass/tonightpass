---
"tonightpass": patch
---

Breaking: Migrate route patterns to use @ for identifiers and ~ for contextual routes

- Changed `/users/:username` to `/users/@:username`
- Changed `/organizations/:organizationSlug` to `/organizations/@:organizationSlug`
- Changed `/profiles/:username` to `/profiles/@:username`
- Changed `/users/@me` to `/users/~me`
- Changed `/channels/@me` to `/channels/~me`
- Changed `/organizations/:organizationSlug/members/@me` to `/organizations/@:organizationSlug/members/~me`

This change prevents route collisions between user slugs and static routes (e.g., a user named "events" no longer conflicts with `/organizations/events`). The `@` prefix clearly indicates public identifiers while `~` indicates contextual/self routes.
