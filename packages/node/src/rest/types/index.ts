import { QueryValue } from "pathcat";

export * from "./auth";
export * from "./careers";
export * from "./health";
export * from "./locations";
export * from "./organizations";
export * from "./users";
export * from "./orders";
export * from "./profiles";
export * from "./webhooks";
export * from "./notifications";

export type Base = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ExcludeBase<T> = Omit<T, keyof Base>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
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

/**
 * Options for array responses with pagination
 */
export interface ArrayPaginationOptions extends Record<string, QueryValue> {
  /**
   * Page number
   * @default 1
   */
  page?: number;
  /**
   * Number of items per page
   * @default 10
   */
  limit?: number;
  /**
   * Offset to start from
   */
  offset?: number;
}

/**
 * Options for sorting array responses
 */
export interface ArraySortOptions extends Record<string, QueryValue> {
  /**
   * Field to sort by
   */
  sortBy?: string;
  /**
   * Sort direction
   */
  sortDirection?: "asc" | "desc";
}

/**
 * Generic options for array responses
 * @template TData The type of data being paginated
 */
export interface ArrayOptions<_TData>
  extends ArrayPaginationOptions,
    ArraySortOptions,
    Record<string, QueryValue> {
  // Additional type-specific options can be added here
  // The Record<string, QueryValue> ensures compatibility with Query types
}

/**
 * Generic result type for paginated arrays
 * @template T The type of items in the array
 */
export interface ArrayResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
