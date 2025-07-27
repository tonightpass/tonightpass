import { IsOptional, IsString, Length } from "class-validator";

export class UpdateChannelMessageDto {
  @IsOptional()
  @IsString()
  @Length(1, 1024)
  content?: string;
}
