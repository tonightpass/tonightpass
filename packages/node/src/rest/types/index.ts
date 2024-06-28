import { Populate } from "@mikro-orm/core";

export * from "./auth";
export * from "./careers";
export * from "./health";
export * from "./organizations";
export * from "./token";
export * from "./users";
export * from "./order";
export * from "./profiles";

export type Base = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ExcludeBase<T> = Omit<T, keyof Base>;

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

export type ArraySortOptions = {
  /**
   * Field to sort
   */
  field: string;
  /**
   * Order to sort
   */
  order: "asc" | "desc";
};

export type ArrayPaginationOptions = {
  /**
   * Page number
   */
  page?: number;
  /**
   * Number of items per page
   */
  limit?: number;
  /**
   * Offset to start from
   */
  offset?: number;
};

export type ArrayFilterOptions = {
  /**
   * Field to filter
   */
  field: string;
  /**
   * Value to filter
   */
  value: string;
  /**
   * Operator to use
   */
  operator:
    | "eq" // Equal
    | "ne" // Not equal
    | "gt" // Greater than
    | "lt" // Less than
    | "gte" // Greater than or equal
    | "lte" // Less than or equal
    | "in" // In
    | "nin"; // Not in
};

export type ArrayOptions<T> = {
  /**
   * Populate relations
   */
  populate?: Populate<T>;
  /**
   * Select only specific fields to display
   */
  // fields?: string[];
};
// & ArraySortOptions
// & ArrayPaginationOptions;

export type ArrayResult<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};
