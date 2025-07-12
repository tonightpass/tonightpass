import { Type, Transform } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsEnum,
  IsLowercase,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  MinDate,
  ValidateNested,
} from "class-validator";

import { CreateOrganizationEventInput } from "./create-organization-event.dto";
import { UpdateOrganizationEventTicketDto } from "./tickets";
import { REGEX } from "../../../../constants";
import {
  DeepPartial,
  OrganizationEventType,
  OrganizationEventVisibilityType,
} from "../../../types";
import { UpdateLocationDto } from "../../locations/update-location.dto";

export class UpdateOrganizationEventDto
  implements DeepPartial<CreateOrganizationEventInput>
{
  @IsOptional()
  @IsString()
  @Length(1, 64)
  title?: string;

  @IsOptional()
  @IsString()
  @IsLowercase()
  @Length(3, 48)
  @Matches(REGEX.SLUG)
  slug?: string;

  @IsOptional()
  @IsString()
  @Length(16, 2048)
  description?: string;

  @IsOptional()
  @IsEnum(OrganizationEventType)
  type?: OrganizationEventType;

  @IsOptional()
  @IsEnum(OrganizationEventVisibilityType)
  visibility?: OrganizationEventVisibilityType;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  flyers?: string[];

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  trailers?: string[];

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateLocationDto)
  location?: UpdateLocationDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateOrganizationEventTicketDto)
  tickets?: UpdateOrganizationEventTicketDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  styles?: string[];

  @IsOptional()
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsDate()
  @MinDate(new Date())
  startAt?: Date;

  @IsOptional()
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsDate()
  @MinDate(new Date())
  endAt?: Date;
}
