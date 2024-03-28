import { sdk } from "./builder";

export const health = sdk((client) => ({
  database: async () => client.get("/health/database"),
  http: async () => client.get("/health/http"),
}));
