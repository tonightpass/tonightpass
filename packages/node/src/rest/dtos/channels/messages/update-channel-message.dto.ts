import { Type } from "class-transformer";
import {
  IsArray,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
  ArrayMaxSize,
} from "class-validator";

import { CreateAttachmentDto } from "./create-channel-message.dto";

export class UpdateChannelMessageDto {
  @IsOptional()
  @IsString()
  @Length(1, 4000)
  content?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => CreateAttachmentDto)
  attachments?: CreateAttachmentDto[];
}
