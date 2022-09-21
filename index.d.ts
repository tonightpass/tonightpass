import "./event";
import "./organization";
import "./tokens";
import "./user";

export type Address = {
  id: string;
  street: string;
  zipCode: string;
  city: string;
  country: string;
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