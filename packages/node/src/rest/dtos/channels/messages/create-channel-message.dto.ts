import { Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Length,
  ValidateNested,
  ArrayMaxSize,
} from "class-validator";

import { AttachmentType } from "../../../types";

export class CreateAttachmentDto {
  @IsEnum(AttachmentType)
  type: AttachmentType;

  @IsUrl()
  url: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  filename?: string;

  @IsOptional()
  @IsString()
  mimeType?: string;
}

export class CreateChannelMessageDto {
  @IsString()
  @Length(1, 4000)
  content: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => CreateAttachmentDto)
  attachments?: CreateAttachmentDto[];

  @IsOptional()
  @IsUUID("4")
  replyToId?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsUUID("4", { each: true })
  mentionIds?: string[];
}
