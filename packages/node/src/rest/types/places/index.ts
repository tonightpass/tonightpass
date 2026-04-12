import type { Endpoint } from "../../endpoints";
import type { ArrayOptions, ArrayResult, Base, ExcludeBase } from "..";

export type PlaceCountry = Base & {
  geonameId: number;
  name: string;
  code: string;
  isoAlpha3: string;
  slug: string;
  continent: string;
  continentName: string;
  capital: string;
  population: number;
  areaInSqKm: number;
  languages: string;
  currencyCode: string;
  north: number;
  south: number;
  east: number;
  west: number;
};

export type PlaceCity = Base & {
  geonameId: number;
  name: string;
  asciiName: string;
  country: string;
  countryCode: string;
  region: string;
  department: string;
  latitude: number;
  longitude: number;
  population: number;
  timezone: string;
  isCapital: boolean;
  citySlug: string;
  countrySlug: string;
};

export type SearchPlacesOptions = ArrayOptions<PlaceCity> & {
  q: string;
};

export type PlaceEndpoints =
  | Endpoint<"GET", "/places/countries", ArrayResult<PlaceCountry>>
  | Endpoint<"GET", "/places/countries/:countrySlug", PlaceCountry>
  | Endpoint<
      "GET",
      "/places/countries/:countrySlug/cities",
      ArrayResult<PlaceCity>,
      ArrayOptions<PlaceCity>
    >
  | Endpoint<
      "GET",
      "/places/countries/:countrySlug/cities/:citySlug",
      PlaceCity | ExcludeBase<PlaceCity>
    >
  | Endpoint<
      "GET",
      "/places/cities",
      ArrayResult<PlaceCity>,
      ArrayOptions<PlaceCity>
    >
  | Endpoint<
      "GET",
      "/places/cities/search",
      ArrayResult<PlaceCity>,
      SearchPlacesOptions
    >;
