export type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

export type CacheStore = {
  get(key: string): Promise<CacheEntry<unknown> | null>;
  set(key: string, entry: CacheEntry<unknown>): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  size(): Promise<number>;
  keys(): Promise<string[]>;
};

export * from "./memory";
