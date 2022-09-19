// Address
export type Address = {
  id: string;
  street: string;
  zipCode: string;
  city: string;
  country: string; // was missing
};

// Currency
export type Currency = "eur" | "usd";

// I18n
export type Language = "fr" | "en";