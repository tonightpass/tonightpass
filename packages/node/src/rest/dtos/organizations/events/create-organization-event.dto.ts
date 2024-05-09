import {
  IsDate,
  IsEnum,
  IsLowercase,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

import { CreateOrganizationEventTicketDto } from "./tickets";
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
  @Length(1, 48)
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

  @IsDate()
  startAt: Date;

  @IsDate()
  endAt: Date;
}
