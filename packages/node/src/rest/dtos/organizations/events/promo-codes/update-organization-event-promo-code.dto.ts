import { Transform } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from "class-validator";
import { OrganizationEventPromoCodeType } from "../../../../types";

export class UpdateOrganizationEventPromoCodeDto {
  @IsOptional()
  @IsString()
  @Length(1, 32)
  code?: string;

  @IsOptional()
  @IsEnum(OrganizationEventPromoCodeType)
  type?: OrganizationEventPromoCodeType;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10_000)
  value?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  maxUses?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minCartAmount?: number;

  @IsOptional()
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsDate()
  expiresAt?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  ticketIds?: string[];
}
