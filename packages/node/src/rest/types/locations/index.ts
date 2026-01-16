/**
 * Represents a GeoJSON point with specific geographic coordinates.
 *
 * @see https://geojson.org/geojson-spec.html#point
 *
 * @property {"Point"} type - The type of the geometry, which is always "Point" for a GeoJSON point.
 * @property {[number, number]} coordinates - The coordinates of the point, represented as [longitude, latitude].
 */
export interface GeoPoint {
  type: "Point";
  coordinates: [number, number];
}

export interface Location {
  name?: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  geometry: GeoPoint;
}

export interface GeoSearchAggregation<T> {
  metadata: { total: number }[];
  data: T[];
}

export type Distance<T> = T & {
  distance: number;
};
