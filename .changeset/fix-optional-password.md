---
"tonightpass": patch
---

fix: make password field optional in User to support OAuth authentication

The password field is now optional (`password?: string`) as users can authenticate via OAuth providers (Google, Facebook, Twitter) without having a password stored in the database.