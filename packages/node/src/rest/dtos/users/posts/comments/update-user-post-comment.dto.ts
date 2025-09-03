import { IsString, Length } from "class-validator";

export class UpdateUserPostCommentDto {
  @IsString()
  @Length(1, 280)
  content: string;
}
