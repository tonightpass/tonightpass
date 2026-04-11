import type { ArrayOptions, Place } from "../rest";
import { sdk } from "./builder";

export const places = sdk((client) => ({
  getAll: async (options?: ArrayOptions<Place>) =>
    client.get("/places", options),
  getByCountry: async (countrySlug: string, options?: ArrayOptions<Place>) =>
    client.get("/places/:countrySlug", { countrySlug, ...options }),
  get: async (countrySlug: string, citySlug: string) =>
    client.get("/places/:countrySlug/:citySlug", { countrySlug, citySlug }),
  search: async (query: string, options?: ArrayOptions<Place>) =>
    client.get("/places/search", { q: query, ...options }),
}));
