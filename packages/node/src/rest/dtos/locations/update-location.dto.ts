import { Type } from "class-transformer";
import { IsOptional, IsString, Length, ValidateNested } from "class-validator";

import { GeoPointDto } from "./create-location.dto";
import { Location } from "../../types";

export class UpdateLocationDto implements Partial<Location> {
  @IsOptional()
  @IsString()
  @Length(1, 128)
  name?: string;

  @IsOptional()
  @IsString()
  @Length(1, 256)
  address?: string;

  @IsOptional()
  @IsString()
  @Length(1, 32)
  zipCode?: string;

  @IsOptional()
  @IsString()
  @Length(1, 128)
  city?: string;

  @IsOptional()
  @IsString()
  @Length(1, 128)
  country?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => GeoPointDto)
  geometry?: GeoPointDto;
}
