import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from "class-validator";

import { CreateOrganizationEventTicketInput } from "./create-organization-event-ticket.dto";
import {
  Currency,
  DeepPartial,
  OrganizationEventTicketCategory,
  OrganizationEventTicketType,
} from "../../../../types";

export class UpdateOrganizationEventTicketDto
  implements DeepPartial<CreateOrganizationEventTicketInput>
{
  @IsString()
  @Length(1, 128)
  @IsOptional()
  name?: string;

  @IsString()
  @Length(1, 1024)
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  quantity?: number;

  @IsEnum(OrganizationEventTicketType)
  @IsOptional()
  type?: OrganizationEventTicketType;

  @IsEnum(OrganizationEventTicketCategory)
  @IsOptional()
  category?: OrganizationEventTicketCategory;

  @IsEnum(Currency)
  @IsOptional()
  currency?: Currency;

  @IsBoolean()
  @IsOptional()
  isVisible?: boolean;

  @IsBoolean()
  @IsOptional()
  isFeesIncluded?: boolean;

  @IsDateString()
  @IsOptional()
  startAt?: Date;

  @IsDateString()
  @IsOptional()
  endAt?: Date;
}
