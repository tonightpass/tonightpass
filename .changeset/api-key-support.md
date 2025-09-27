---
"tonightpass": patch
---

Add API key support to TonightPass SDK

- Add optional `apiKey` parameter to `ClientOptions`
- Automatically inject `X-API-Key` header when API key is provided
- Maintain backward compatibility with existing code