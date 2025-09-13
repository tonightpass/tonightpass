import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsOptional, IsString, Length, Matches } from "class-validator";

import { UserPostVisibility } from "../../../types/users/posts";

export class CreateUserPostDto {
  @IsOptional()
  @IsString()
  @Length(1, 512)
  content?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @Matches(
    /^https:\/\/(cdn\.staging\.tonightpass\.com|cdn\.tonightpass\.com)\/(temp\/posts\/media\/|users\/[\w-]+\/posts\/[\w-]+\/media\/)/,
    { each: true },
  )
  mediaUrls: string[];

  @IsOptional()
  @IsEnum(UserPostVisibility)
  visibility?: UserPostVisibility;
}
