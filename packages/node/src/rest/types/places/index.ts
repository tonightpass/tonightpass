import type { Endpoint } from "../../endpoints";
import type { ArrayOptions, ArrayResult, Base, ExcludeBase } from "..";

export type Place = Base & {
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
  citySlug: string;
  countrySlug: string;
};

export type SearchPlacesOptions = ArrayOptions<Place> & {
  q: string;
};

export type PlaceEndpoints =
  | Endpoint<"GET", "/places", ArrayResult<Place>, ArrayOptions<Place>>
  | Endpoint<
      "GET",
      "/places/:countrySlug/:citySlug",
      Place | ExcludeBase<Place>
    >
  | Endpoint<
      "GET",
      "/places/search",
      ArrayResult<Place>,
      SearchPlacesOptions
    >;
