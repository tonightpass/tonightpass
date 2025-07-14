import { Endpoint } from "../../endpoints";
import { Currency } from "../index";

export interface ExchangeRates {
  base: Currency.EUR;
  rates: Record<Currency, number>;
  updatedAt: Date;
}

export interface CurrencyConversion {
  from: Currency;
  to: Currency;
  amount: number;
}

export interface CurrencyConversionResult {
  originalAmount: number;
  originalCurrency: Currency;
  convertedAmount: number;
  targetCurrency: Currency;
  exchangeRate: number;
  convertedAt: Date;
}

export type CurrencyEndpoints =
  | Endpoint<"GET", "/currency/rates", ExchangeRates>
  | Endpoint<
      "POST",
      "/currency/convert",
      CurrencyConversionResult,
      CurrencyConversion
    >;
