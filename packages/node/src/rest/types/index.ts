export * from "./event";
export * from "./organization";
export * from "./token";
export * from "./user";
export * from "./order";
export * from "./profile";

// - API
export * from "./api";

export type Location = {
  name?: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  geometry?: {
    latitude: number;
    longitude: number;
  };
};

// Currency
export enum Currency {
  EUR = "EUR",
  USD = "USD",
  GBP = "GBP",
}

// I18n
export enum Language {
  FR = "fr",
  EN = "en",
}
