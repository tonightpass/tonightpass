import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from "class-validator";

import { GeoPoint, Location } from "../../types";

export class GeoPointDto implements GeoPoint {
  @IsString()
  @IsNotEmpty()
  type: "Point";

  @IsArray({
    each: true,
  })
  @IsNotEmpty()
  coordinates: [number, number];

  constructor() {
    this.type = "Point";
  }

  @ValidateNested()
  public validate(): boolean {
    const [longitude, latitude] = this.coordinates;
    return (
      latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180
    );
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
