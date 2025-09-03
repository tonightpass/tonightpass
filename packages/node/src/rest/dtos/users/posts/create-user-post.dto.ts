import { IsArray, IsEnum, IsOptional, IsString, Length } from "class-validator";

import { UserPostVisibility } from "../../../types/users/posts";

export class CreateUserPostDto {
  @IsOptional()
  @IsString()
  @Length(1, 500)
  content?: string;

  @IsArray()
  @IsString({ each: true })
  @Length(0, 10)
  mediaIds: string[];

  @IsOptional()
  @IsEnum(UserPostVisibility)
  visibility?: UserPostVisibility;
}
