import { Transform } from "class-transformer";
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { IsAfterNow } from "../../validators/is-after-now";

export class RescheduleOrganizationEventDto {
  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsDate()
  @IsAfterNow()
  startAt!: Date;

  @Transform(({ value }) => (value instanceof Date ? value : new Date(value)))
  @IsDate()
  @IsAfterNow()
  endAt!: Date;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  reason?: string;

  @IsOptional()
  @IsBoolean()
  notifyHolders?: boolean;
}
