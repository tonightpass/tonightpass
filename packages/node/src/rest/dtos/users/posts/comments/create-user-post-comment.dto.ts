import { IsOptional, IsString, Length } from "class-validator";

export class CreateUserPostCommentDto {
  @IsString()
  @Length(1, 280)
  content: string;

  @IsOptional()
  @IsString()
  replyToId?: string;
}
