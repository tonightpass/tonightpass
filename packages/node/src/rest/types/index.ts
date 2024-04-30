export * from "./auth";
export * from "./careers";
export * from "./organizations/events";
export * from "./health";
export * from "./organizations";
export * from "./token";
export * from "./users";
export * from "./order";
export * from "./profiles";

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
