---
"tonightpass": minor
---

Add currency exchange rates support and expand Currency enum

- Add ExchangeRates, CurrencyConversion, and CurrencyConversionResult types
- Add CurrencyEndpoints with GET /currency/rates and POST /currency/convert
- Expand Currency enum with all European currencies (20+ currencies including BGN, CZK, DKK, HUF, PLN, RON, SEK, CHF, NOK, ISK, TRY, RUB, UAH, etc.)
- Support for real-time currency conversion with ECB rates
- Enable frontend currency switching with backend API integration