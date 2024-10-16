import { HealthCheckResult, HealthIndicatorResult } from "@nestjs/terminus";

import { Endpoint } from "../../endpoints";

export interface Health<T extends string = string> extends HealthCheckResult {
  info?: Record<T, HealthIndicatorResult[T]>;
  error?: Record<T, HealthIndicatorResult[T]>;
  details: Record<T, HealthIndicatorResult[T]>;
}

export type HealthEndpoints =
  | Endpoint<"GET", "/health", Health<"database" | "app" | "api" | "database">>
  | Endpoint<"GET", "/health/database", Health<"database">>
  | Endpoint<"GET", "/health/api", Health<"api">>
  | Endpoint<"GET", "/health/app", Health<"app">>;
