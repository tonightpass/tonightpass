import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsLowercase,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  MinDate,
  ValidateNested,
} from "class-validator";

import {
  CreateOrganizationEventTicketDto,
  CreateOrganizationEventTicketInput,
} from "./tickets";
import { REGEX } from "../../../../constants";
import {
  OrganizationEventType,
  OrganizationEventVisibilityType,
  OrganizationEvent,
  ExcludeBase,
} from "../../../types";
import { CreateLocationDto } from "../../locations/create-location.dto";

export type CreateOrganizationEventInput = Omit<
  ExcludeBase<OrganizationEvent>,
  | "slug"
  | "styles"
  | "tickets"
  | "organization"
  | "viewsCount"
  | "sessionsCount"
  | "totalViewsCount"
  | "averageViewsPerSessionCount"
> & {
  slug?: string;
  styles: string[];
  tickets: CreateOrganizationEventTicketInput[];
};

export class CreateOrganizationEventDto
  implements CreateOrganizationEventInput
{
  @IsString()
  @IsNotEmpty()
  @Length(1, 64)
  title: string;

  @IsOptional()
  @IsString()
  @IsLowercase()
  @Length(3, 48)
  @Matches(REGEX.SLUG)
  slug?: string;

  @IsString()
  @IsNotEmpty()
  @Length(16, 2048)
  description: string;

  @IsEnum(OrganizationEventType)
  @IsNotEmpty()
  type: OrganizationEventType;

  @IsEnum(OrganizationEventVisibilityType)
  @IsNotEmpty()
  visibility: OrganizationEventVisibilityType;

  @IsArray()
  @IsUrl({}, { each: true })
  flyers: string[];

  @IsArray()
  @IsUrl({}, { each: true })
  trailers: string[];

  @IsObject()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  @IsNotEmpty()
  location: CreateLocationDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrganizationEventTicketDto)
  @IsNotEmpty()
  tickets: CreateOrganizationEventTicketDto[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  styles: string[]; // Array of style IDs

  @IsDateString()
  @IsNotEmpty()
  @MinDate(new Date())
  startAt: Date;

  @IsDateString()
  @IsNotEmpty()
  @MinDate(new Date())
  endAt: Date;
}
