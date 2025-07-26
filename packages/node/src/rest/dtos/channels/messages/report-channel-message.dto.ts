import { IsEnum, IsOptional, IsString, Length } from "class-validator";

import { ChannelMessageReportReason } from "../../../types";

export class ReportChannelMessageDto {
  @IsEnum(ChannelMessageReportReason)
  reason: ChannelMessageReportReason;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  description?: string;
}
