import type { Query } from "pathcat";

import { sdk } from "./builder";

export const places = sdk((client) => ({
  countries: {
    getAll: async (query?: Query<"/places/countries">) =>
      client.get("/places/countries", query),
    get: async (query: Query<"/places/countries/:countrySlug">) =>
      client.get("/places/countries/:countrySlug", query),
    cities: {
      getAll: async (query: Query<"/places/countries/:countrySlug/cities">) =>
        client.get("/places/countries/:countrySlug/cities", query),
      get: async (
        query: Query<"/places/countries/:countrySlug/cities/:citySlug">
      ) => client.get("/places/countries/:countrySlug/cities/:citySlug", query),
      nearby: async (
        query: Query<"/places/countries/:countrySlug/cities/:citySlug/nearby">
      ) =>
        client.get(
          "/places/countries/:countrySlug/cities/:citySlug/nearby",
          query
        ),
    },
  },
  cities: {
    getAll: async (query?: Query<"/places/cities">) =>
      client.get("/places/cities", query),
    search: async (query: Query<"/places/cities/search">) =>
      client.get("/places/cities/search", query),
  },
}));
