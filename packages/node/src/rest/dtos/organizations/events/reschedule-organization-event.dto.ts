import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  Length,
  MinDate,
} from "class-validator";

export class RescheduleOrganizationEventDto {
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsDate()
  @MinDate(new Date())
  startAt!: Date;

  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsDate()
  @MinDate(new Date())
  endAt!: Date;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  reason?: string;

  @IsOptional()
  @IsBoolean()
  notifyHolders?: boolean;
}
