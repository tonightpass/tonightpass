import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

type ContentOrAttachmentsShape = {
  content?: string;
  attachments?: unknown[];
};

/**
 * Validates that a channel message has at least one of `content` (non-blank
 * after trim) or `attachments` (non-empty array).
 */
@ValidatorConstraint({ name: "contentOrAttachments", async: false })
export class ContentOrAttachmentsConstraint
  implements ValidatorConstraintInterface
{
  validate(_value: unknown, args: ValidationArguments): boolean {
    const object = args.object as ContentOrAttachmentsShape;
    const hasContent = Boolean(
      object.content && object.content.trim().length > 0
    );
    const hasAttachments = Boolean(
      object.attachments && object.attachments.length > 0
    );
    return hasContent || hasAttachments;
  }

  defaultMessage(): string {
    return "Either content or attachments must be provided";
  }
}
