import {
  IsEnum,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from "class-validator";

import { ChannelMessageReportReason } from "../../../types";

export class ReportChannelMessageDto {
  @IsEnum(ChannelMessageReportReason)
  reason: ChannelMessageReportReason;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.description && o.description.trim().length > 0)
  @Length(1, 500)
  description?: string;
}
