---
"tonightpass": patch
---

Remove fallback source option from ExchangeRates interface

- Change ExchangeRates.source from "ecb" | "fallback" to "ecb" only
- Enforce ECB as the sole exchange rate source without fallback options