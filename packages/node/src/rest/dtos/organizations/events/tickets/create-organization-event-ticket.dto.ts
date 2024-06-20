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

import {
  Currency,
  OrganizationEventTicketCategory,
  OrganizationEventTicketType,
} from "../../../../types";

export class CreateOrganizationEventTicketDto {
  @IsString()
  @Length(1, 128)
  name: string;

  @IsString()
  @Length(1, 512)
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  type: OrganizationEventTicketType;

  @IsEnum(OrganizationEventTicketCategory)
  category: OrganizationEventTicketCategory;

  @IsEnum(Currency)
  currency: Currency;

  @IsBoolean()
  isVisible: boolean;

  @IsBoolean()
  isFeesIncluded: boolean;

  @IsDateString()
  @IsOptional()
  startAt?: Date;

  @IsDateString()
  @IsOptional()
  endAt?: Date;
}
