import type { Endpoint } from "../../endpoints";

/**
 * All currencies supported by Stripe for card payments.
 * Source: https://docs.stripe.com/currencies#presentment-currencies
 */
export enum Currency {
  // Major
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",

  // Americas
  ARS = "ARS",
  AWG = "AWG",
  BBD = "BBD",
  BMD = "BMD",
  BOB = "BOB",
  BRL = "BRL",
  BSD = "BSD",
  BZD = "BZD",
  CAD = "CAD",
  CLP = "CLP",
  COP = "COP",
  CRC = "CRC",
  DOP = "DOP",
  FKP = "FKP",
  GTQ = "GTQ",
  GYD = "GYD",
  HNL = "HNL",
  HTG = "HTG",
  JMD = "JMD",
  KYD = "KYD",
  MXN = "MXN",
  NIO = "NIO",
  PAB = "PAB",
  PEN = "PEN",
  PYG = "PYG",
  SRD = "SRD",
  TTD = "TTD",
  UYU = "UYU",
  XCD = "XCD",

  // Europe
  ALL = "ALL",
  BAM = "BAM",
  BGN = "BGN",
  BYN = "BYN",
  CHF = "CHF",
  CZK = "CZK",
  DKK = "DKK",
  GEL = "GEL",
  GIP = "GIP",
  HUF = "HUF",
  ISK = "ISK",
  MDL = "MDL",
  MKD = "MKD",
  NOK = "NOK",
  PLN = "PLN",
  RON = "RON",
  RSD = "RSD",
  RUB = "RUB",
  SEK = "SEK",
  TRY = "TRY",
  UAH = "UAH",

  // Asia & Middle East
  AED = "AED",
  AFN = "AFN",
  AMD = "AMD",
  AZN = "AZN",
  BDT = "BDT",
  BND = "BND",
  CNY = "CNY",
  HKD = "HKD",
  IDR = "IDR",
  ILS = "ILS",
  INR = "INR",
  JPY = "JPY",
  KGS = "KGS",
  KHR = "KHR",
  KRW = "KRW",
  KZT = "KZT",
  LAK = "LAK",
  LBP = "LBP",
  LKR = "LKR",
  MMK = "MMK",
  MNT = "MNT",
  MOP = "MOP",
  MVR = "MVR",
  MYR = "MYR",
  NPR = "NPR",
  PHP = "PHP",
  PKR = "PKR",
  QAR = "QAR",
  SAR = "SAR",
  SGD = "SGD",
  THB = "THB",
  TJS = "TJS",
  TWD = "TWD",
  UZS = "UZS",
  VND = "VND",
  YER = "YER",

  // Africa
  AOA = "AOA",
  BWP = "BWP",
  CDF = "CDF",
  CVE = "CVE",
  DJF = "DJF",
  DZD = "DZD",
  EGP = "EGP",
  ETB = "ETB",
  GMD = "GMD",
  GNF = "GNF",
  KES = "KES",
  KMF = "KMF",
  LRD = "LRD",
  LSL = "LSL",
  MAD = "MAD",
  MGA = "MGA",
  MUR = "MUR",
  MWK = "MWK",
  MZN = "MZN",
  NAD = "NAD",
  NGN = "NGN",
  RWF = "RWF",
  SCR = "SCR",
  SHP = "SHP",
  SLE = "SLE",
  SOS = "SOS",
  STD = "STD",
  SZL = "SZL",
  TZS = "TZS",
  UGX = "UGX",
  XAF = "XAF",
  XOF = "XOF",
  ZAR = "ZAR",
  ZMW = "ZMW",

  // Oceania & Pacific
  ANG = "ANG",
  AUD = "AUD",
  BIF = "BIF",
  FJD = "FJD",
  NZD = "NZD",
  PGK = "PGK",
  SBD = "SBD",
  TOP = "TOP",
  VUV = "VUV",
  WST = "WST",
  XCG = "XCG",
  XPF = "XPF",
}

/**
 * Zero-decimal currencies have no minor units (no cents).
 * Amounts are specified in the major unit directly (e.g., 500 JPY = 500 yen).
 * Source: https://docs.stripe.com/currencies#zero-decimal
 */
export const ZERO_DECIMAL_CURRENCIES: Currency[] = [
  Currency.BIF,
  Currency.CLP,
  Currency.DJF,
  Currency.GNF,
  Currency.JPY,
  Currency.KMF,
  Currency.KRW,
  Currency.MGA,
  Currency.PYG,
  Currency.RWF,
  Currency.UGX,
  Currency.VND,
  Currency.VUV,
  Currency.XAF,
  Currency.XOF,
  Currency.XPF,
];

/**
 * Minimum charge amounts per currency (in smallest unit).
 * Source: https://docs.stripe.com/currencies#minimum-and-maximum-charge-amounts
 */
export const MINIMUM_CHARGE_AMOUNTS: Partial<Record<Currency, number>> = {
  [Currency.USD]: 50,
  [Currency.AED]: 200,
  [Currency.ARS]: 50,
  [Currency.AUD]: 50,
  [Currency.BRL]: 50,
  [Currency.CAD]: 50,
  [Currency.CHF]: 50,
  [Currency.COP]: 50,
  [Currency.CZK]: 1500,
  [Currency.DKK]: 250,
  [Currency.EUR]: 50,
  [Currency.GBP]: 30,
  [Currency.HKD]: 400,
  [Currency.HUF]: 17_500,
  [Currency.IDR]: 50,
  [Currency.ILS]: 50,
  [Currency.INR]: 50,
  [Currency.JPY]: 50,
  [Currency.KRW]: 50,
  [Currency.MXN]: 1000,
  [Currency.MYR]: 200,
  [Currency.NOK]: 300,
  [Currency.NZD]: 50,
  [Currency.PHP]: 50,
  [Currency.PLN]: 200,
  [Currency.RON]: 200,
  [Currency.RUB]: 50,
  [Currency.SEK]: 300,
  [Currency.SGD]: 50,
  [Currency.THB]: 1000,
  [Currency.ZAR]: 50,
};

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
