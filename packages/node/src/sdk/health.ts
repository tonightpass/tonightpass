import { sdk } from "./builder";

export const health = sdk((client) => ({
  http: async () => client.get("/health/http"),
}));
