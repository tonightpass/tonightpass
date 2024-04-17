import { sdk } from "./builder";

export const health = sdk((client) => ({
  getAll: async () => client.get("/health"),
  database: async () => client.get("/health/database"),
  http: async () => client.get("/health/http"),
}));
