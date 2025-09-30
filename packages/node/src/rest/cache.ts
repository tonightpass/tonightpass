import { Options } from "redaxios";

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export interface CacheOptions {
  enabled: boolean;
  ttl?: number;
  methods?: Options["method"][];
}

export class CacheManager {
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  private options: Required<CacheOptions>;

  constructor(options: CacheOptions) {
    this.options = {
      enabled: options.enabled,
      ttl: options.ttl ?? 60000,
      methods: options.methods ?? ["GET"],
    };
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

  get<T>(method: Options["method"], url: string): T | null {
    if (!this.shouldCache(method)) {
      return null;
    }

    const key = this.generateKey(method, url);
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;

    if (!entry) {
      return null;
    }

    if (!this.isValid(entry)) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  set<T>(method: Options["method"], url: string, data: T): void {
    if (!this.shouldCache(method)) {
      return;
    }

    const key = this.generateKey(method, url);
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  clear(): void {
    this.cache.clear();
  }

  stats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}
