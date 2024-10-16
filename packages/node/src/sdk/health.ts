import { sdk } from "./builder";

export const health = sdk((client) => ({
  getAll: async () => client.get("/health"),
  database: async () => client.get("/health/database"),
  api: async () => client.get("/health/api"),
  app: async () => client.get("/health/app"),
}));
