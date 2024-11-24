export type GeoPoint = {
  type: "Point";
  coordinates: [number, number];
};

export type Location = {
  name?: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  geometry: GeoPoint;
};

export interface GeoSearchAggregation<T> {
  metadata: { total: number }[];
  data: T[];
}

export type Distance<T> = T & {
  distance: number;
};
