export * from "./auth";
export * from "./careers";
export * from "./channels";
export * from "./currencies";
export * from "./errors";
export * from "./feed";
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ArrayOptions<T> = {
  /**
   * Select only specific fields to display
   */
  // fields?: readonly AutoPath<T, Fields, `${PopulatePath.ALL}`>[];
  /**
   * Exclude specific fields from the result
  //  */
  // exclude?: readonly AutoPath<T, string>[];
} & ArrayPaginationOptions;

export type ArrayResult<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};
