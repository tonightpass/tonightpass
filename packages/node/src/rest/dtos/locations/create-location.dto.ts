import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Validate,
  ValidateNested,
} from "class-validator";

import type { GeoPoint, Location } from "../../types";
import { CoordinatesRangeConstraint } from "../validators/coordinates-range";
import { normalizeAddress } from "./normalize-address";

export class GeoPointDto implements GeoPoint {
  @IsString()
  @IsNotEmpty()
  type: "Point";

  @IsArray()
  @IsNotEmpty()
  @Validate(CoordinatesRangeConstraint)
  coordinates: [number, number];

  constructor() {
    this.type = "Point";
    this.coordinates = [0, 0];
  }
}

export class CreateLocationDto implements Location {
  @IsOptional()
  @IsString()
  @Length(1, 128)
  name?: string;

  @Transform(({ value, obj }) =>
    normalizeAddress(value, {
      zipCode: obj.zipCode,
      city: obj.city,
      country: obj.country,
    })
  )
  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  address: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 32)
  zipCode: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 128)
  city: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 128)
  country: string;

  @ValidateNested()
  @Type(() => GeoPointDto)
  @IsNotEmpty()
  geometry: GeoPointDto;
}
