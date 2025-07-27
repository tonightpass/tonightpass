import {
  IsArray,
  IsOptional,
  IsString,
  Length,
  ArrayMaxSize,
  IsMongoId,
  Matches,
  ValidateIf,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "contentOrAttachments", async: false })
export class ContentOrAttachmentsConstraint
  implements ValidatorConstraintInterface
{
  validate(_value: unknown, args: ValidationArguments): boolean {
    const object = args.object as CreateChannelMessageDto;
    const hasContent = Boolean(
      object.content && object.content.trim().length > 0,
    );
    const hasAttachments = Boolean(
      object.attachments && object.attachments.length > 0,
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
  @Matches(/^channels\/[\w-]+\/messages\/[\w-]+\/private\/[\w-]+$/, {
    each: true,
  })
  @Validate(ContentOrAttachmentsConstraint)
  attachments?: string[];

  @IsOptional()
  @IsMongoId()
  replyToId?: string;
}
