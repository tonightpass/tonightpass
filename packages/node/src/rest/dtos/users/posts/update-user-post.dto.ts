import { IsEnum, IsOptional, IsString, Length } from "class-validator";

import { UserPostVisibility } from "../../../types/users/posts";

export class UpdateUserPostDto {
  @IsOptional()
  @IsString()
  @Length(1, 512)
  content?: string;

  @IsOptional()
  @IsEnum(UserPostVisibility)
  visibility?: UserPostVisibility;
}
