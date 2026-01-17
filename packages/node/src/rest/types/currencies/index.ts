import type { Endpoint } from "../../endpoints";

// Currency
export enum Currency {
  // Major currencies
  EUR = "EUR",
  USD = "USD",
  GBP = "GBP",

  // European currencies (EU member states)
  BGN = "BGN",
  CZK = "CZK",
  DKK = "DKK",
  HUF = "HUF",
  PLN = "PLN",
  RON = "RON",
  SEK = "SEK",

  // European currencies (non-EU but European)
  CHF = "CHF",
  NOK = "NOK",
  ISK = "ISK",
  TRY = "TRY",
  RUB = "RUB",
  UAH = "UAH",
  BAM = "BAM",
  MKD = "MKD",
  ALL = "ALL",
  RSD = "RSD",
  MDL = "MDL",
  GEL = "GEL",
  BYN = "BYN",
}

export type ExchangeRates = {
  base: Currency.EUR;
  rates: Record<Currency, number>;
  updatedAt: Date;
};

export type CurrencyConversion = {
  from: Currency;
  to: Currency;
  amount: number;
};

export type CurrencyConversionResult = {
  originalAmount: number;
  originalCurrency: Currency;
  convertedAmount: number;
  targetCurrency: Currency;
  exchangeRate: number;
  convertedAt: Date;
};

export type CurrenciesEndpoints =
  | Endpoint<"GET", "/currencies/rates", ExchangeRates>
  | Endpoint<
      "POST",
      "/currencies/convert",
      CurrencyConversionResult,
      CurrencyConversion
    >;
