import type {
  HealthCheckResult,
  HealthIndicatorResult,
} from "@nestjs/terminus";

import type { Endpoint } from "../../endpoints";

export interface Health<T extends string = string> extends HealthCheckResult {
  info?: Record<T, HealthIndicatorResult[T]>;
  error?: Record<T, HealthIndicatorResult[T]>;
  details: Record<T, HealthIndicatorResult[T]>;
}

export type MemorySnapshot = {
  heapUsed: number;
  heapTotal: number;
  rss: number;
  external: number;
};

export type HealthMemory = {
  before: MemorySnapshot;
  afterGc: MemorySnapshot;
};

export type HealthEndpoints =
  | Endpoint<"GET", "/health", Health<"database" | "app" | "api" | "database">>
  | Endpoint<"GET", "/health/database", Health<"database">>
  | Endpoint<"GET", "/health/api", Health<"api">>
  | Endpoint<"GET", "/health/app", Health<"app">>
  | Endpoint<"GET", "/health/memory", HealthMemory>;
