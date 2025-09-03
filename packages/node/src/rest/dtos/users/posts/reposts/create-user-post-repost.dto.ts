import { IsOptional, IsString, Length } from "class-validator";

export class CreateUserPostRepostDto {
  @IsOptional()
  @IsString()
  @Length(1, 280)
  comment?: string;
}
