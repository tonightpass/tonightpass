import type { Options } from "redaxios";

import { type CacheEntry, type CacheStore, MemoryCacheStore } from "./store";

export type CacheOptions = {
  enabled: boolean;
  ttl?: number;
  maxSize?: number;
  methods?: Options["method"][];
  store?: CacheStore;
};

export class CacheManager {
  private readonly store: CacheStore;
  private readonly options: Required<Omit<CacheOptions, "store">>;

  constructor(options: CacheOptions) {
    this.options = {
      enabled: options.enabled,
      ttl: options.ttl ?? 60_000,
      maxSize: options.maxSize ?? 1000,
      methods: options.methods ?? ["GET"],
    };
    this.store = options.store ?? new MemoryCacheStore(this.options.maxSize);
  }

  private generateKey(method: Options["method"], url: string): string {
    return `${method}:${url}`;
  }

  private shouldCache(method: Options["method"]): boolean {
    return this.options.enabled && this.options.methods.includes(method);
  }

  private isValid(entry: CacheEntry<unknown>): boolean {
    const age = Date.now() - entry.timestamp;
    return age < this.options.ttl;
  }

  async get<T>(method: Options["method"], url: string): Promise<T | null> {
    if (!this.shouldCache(method)) {
      return null;
    }

    const key = this.generateKey(method, url);
    const entry = (await this.store.get(key)) as CacheEntry<T> | null;

    if (!entry) {
      return null;
    }

    if (!this.isValid(entry)) {
      await this.store.delete(key);
      return null;
    }

    return entry.data;
  }

  async set<T>(method: Options["method"], url: string, data: T): Promise<void> {
    if (!this.shouldCache(method)) {
      return;
    }

    const key = this.generateKey(method, url);
    await this.store.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  async clear(): Promise<void> {
    await this.store.clear();
  }

  async stats(): Promise<{ size: number; keys: string[] }> {
    return {
      size: await this.store.size(),
      keys: await this.store.keys(),
    };
  }
}
