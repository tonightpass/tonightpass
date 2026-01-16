import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Validate,
  ValidateNested,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
} from "class-validator";

import type { GeoPoint, Location } from "../../types";

@ValidatorConstraint({ name: "coordinatesRange", async: false })
class CoordinatesRangeConstraint implements ValidatorConstraintInterface {
  validate(coordinates: [number, number]) {
    if (!Array.isArray(coordinates) || coordinates.length !== 2) {
      return false;
    }
    const [longitude, latitude] = coordinates;
    return (
      latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180
    );
  }

  defaultMessage() {
    return "Coordinates must be within valid geographic ranges";
  }
}

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
  }
}

export class CreateLocationDto implements Location {
  @IsOptional()
  @IsString()
  @Length(1, 128)
  name?: string;

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
