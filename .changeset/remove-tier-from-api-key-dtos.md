---
"tonightpass": patch
---

Remove tier field from CreateApiKeyDto and UpdateApiKeyDto for security

API key tiers will now be managed manually through direct database operations instead of being user-controllable through the API. This prevents users from escalating their API key privileges.