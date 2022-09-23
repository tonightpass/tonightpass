export * from "./event";
export * from "./organization";
export * from "./token";
export * from "./user";

export type Location = {
  name?: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  geometry?: {
    latitude: number;
    longitude: number
  };
};

// Currency
export enum Currency {
  EUR,
  USD
}

// I18n
export enum Language {
  FR,
  EN
}