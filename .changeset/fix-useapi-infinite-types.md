---
"@tonightpass/react": patch
---

Fix useAPIInfinite hook type issues and improve data handling

- Fixed fetcher function parameter types to handle undefined query parameters
- Updated getKey function signature to properly type query parameters
- Improved data concatenation in components to filter out undefined pages
- Removed @ts-expect-error comment as types are now properly handled