import { sdk } from "./builder";

export const sitemaps = sdk((client) => ({
  getCounts: async () => client.get("/sitemaps/counts"),
}));
