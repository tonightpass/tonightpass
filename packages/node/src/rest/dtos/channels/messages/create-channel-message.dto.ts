import {
  ArrayMaxSize,
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  Length,
  Matches,
  Validate,
  ValidateIf,
} from "class-validator";
import { REGEX } from "../../../../constants/regex";
import { ContentOrAttachmentsConstraint } from "../../validators/content-or-attachments";

export class CreateChannelMessageDto {
  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.content !== undefined)
  @Length(1, 1024)
  content?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @Matches(REGEX.CHANNEL_MESSAGE_ATTACHMENT, {
    each: true,
  })
  @Validate(ContentOrAttachmentsConstraint)
  attachments?: string[];

  @IsOptional()
  @IsMongoId()
  replyToId?: string;
}
