import { Transform, Type } from "class-transformer";
import {
  ArrayMaxSize,
  IsArray,
  IsDate,
  IsEnum,
  IsLowercase,
  IsObject,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateNested,
} from "class-validator";
import { REGEX } from "../../../../constants";
import {
  type DeepPartial,
  OrganizationEventType,
  OrganizationEventVisibilityType,
} from "../../../types";
import { UpdateLocationDto } from "../../locations/update-location.dto";
import { AtLeastOneMediaOnUpdate } from "../../validators/at-least-one-media";
import { IsAfterNow } from "../../validators/is-after-now";
import type { CreateOrganizationEventInput } from "./create-organization-event.dto";
import { EventArtistDto } from "./event-artist.dto";
import { UpdateOrganizationEventTicketDto } from "./tickets";

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
  @Matches(REGEX.SLUG, {
    message: "organization.event.slug.format",
  })
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
  @Matches(REGEX.EVENT_FLYER_URL_UPDATE, {
    each: true,
    message: "organization.event.flyers.url.invalid",
  })
  @AtLeastOneMediaOnUpdate()
  flyers?: string[];

  @IsOptional()
  @IsArray()
  @Matches(REGEX.EVENT_TRAILER_URL_UPDATE, {
    each: true,
    message: "organization.event.trailers.url.invalid",
  })
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
  @IsArray()
  @ArrayMaxSize(50)
  @ValidateNested({ each: true })
  @Type(() => EventArtistDto)
  artists?: EventArtistDto[];

  @IsOptional()
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsDate()
  @IsAfterNow()
  startAt?: Date;

  @IsOptional()
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsDate()
  @IsAfterNow()
  endAt?: Date;
}
