import type { Endpoint } from "../../endpoints";

export type SitemapCounts = {
  limit: number;
  profiles: number;
  events: number;
  countries: number;
  cities: number;
  types: number;
  styles: number;
  careers: number;
};

export type SitemapEndpoints = Endpoint<
  "GET",
  "/sitemaps/counts",
  SitemapCounts
>;
