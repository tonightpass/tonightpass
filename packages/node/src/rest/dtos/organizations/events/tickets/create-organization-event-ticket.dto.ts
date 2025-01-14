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
  OrganizationEventTicket,
  ExcludeBase,
} from "../../../../types";

export type CreateOrganizationEventTicketInput = Omit<
  ExcludeBase<OrganizationEventTicket>,
  "price" | "product" | "event" | "fee"
> & {
  price: number;
};

export class CreateOrganizationEventTicketDto
  implements CreateOrganizationEventTicketInput
{
  @IsString()
  @Length(1, 128)
  name: string;

  @IsString()
  @Length(1, 1024)
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsEnum(OrganizationEventTicketType)
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
