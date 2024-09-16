import {
  IsDateString,
  IsEnum,
  IsLowercase,
  IsOptional,
  IsString,
  Length,
  Matches,
} from "class-validator";

import { CreateOrganizationEventTicketDto } from "./tickets";
import { REGEX } from "../../../../constants";
import {
  Location,
  OrganizationEventType,
  OrganizationEventVisibilityType,
} from "../../../types";

export class CreateOrganizationEventDto {
  @IsString()
  @Length(1, 64)
  title: string;

  @IsOptional()
  @IsString()
  @IsLowercase()
  @Length(3, 48)
  @Matches(REGEX.SLUG)
  slug?: string;

  @IsString()
  @Length(16, 2048)
  description: string;

  @IsEnum(OrganizationEventType)
  type: OrganizationEventType;

  @IsEnum(OrganizationEventVisibilityType)
  visibility: OrganizationEventVisibilityType;

  flyers: string[];
  trailers: string[];
  location: Location;
  tickets: CreateOrganizationEventTicketDto[];
  styles: string[];

  @IsDateString()
  startAt: Date;

  @IsDateString()
  endAt: Date;
}
