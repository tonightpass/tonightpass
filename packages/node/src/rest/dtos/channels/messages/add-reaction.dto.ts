import { IsString, Length } from "class-validator";

export class AddReactionDto {
  @IsString()
  @Length(1, 10)
  emoji: string;
}
