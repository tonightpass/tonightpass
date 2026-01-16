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
  type ValidationArguments,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
} from "class-validator";
import { REGEX } from "../../../../constants/regex";

@ValidatorConstraint({ name: "contentOrAttachments", async: false })
export class ContentOrAttachmentsConstraint
  implements ValidatorConstraintInterface
{
  validate(_value: unknown, args: ValidationArguments): boolean {
    const object = args.object as CreateChannelMessageDto;
    const hasContent = Boolean(
      object.content && object.content.trim().length > 0
    );
    const hasAttachments = Boolean(
      object.attachments && object.attachments.length > 0
    );
    return hasContent || hasAttachments;
  }

  defaultMessage(_args: ValidationArguments): string {
    return "Either content or attachments must be provided";
  }
}

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
