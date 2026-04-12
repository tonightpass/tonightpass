import type { ArrayOptions, PlaceCity } from "../rest";
import { sdk } from "./builder";

export const places = sdk((client) => ({
  countries: {
    getAll: async () => client.get("/places/countries"),
    get: async (countrySlug: string) =>
      client.get("/places/countries/:countrySlug", { countrySlug }),
    cities: {
      getAll: async (
        countrySlug: string,
        options?: ArrayOptions<PlaceCity>,
      ) =>
        client.get("/places/countries/:countrySlug/cities", {
          countrySlug,
          ...options,
        }),
      get: async (countrySlug: string, citySlug: string) =>
        client.get("/places/countries/:countrySlug/cities/:citySlug", {
          countrySlug,
          citySlug,
        }),
    },
  },
  cities: {
    getAll: async (options?: ArrayOptions<PlaceCity>) =>
      client.get("/places/cities", options),
    search: async (query: string, options?: ArrayOptions<PlaceCity>) =>
      client.get("/places/cities/search", { q: query, ...options }),
  },
}));
