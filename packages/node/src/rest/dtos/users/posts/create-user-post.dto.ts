import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
} from "class-validator";
import { REGEX } from "../../../../constants/regex";
import { UserPostVisibility } from "../../../types/users/posts";

export class CreateUserPostDto {
  @IsOptional()
  @IsString()
  @Length(1, 512)
  content?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @Matches(REGEX.USER_POST_MEDIA_URL, { each: true })
  mediaUrls: string[];

  @IsOptional()
  @IsEnum(UserPostVisibility)
  visibility?: UserPostVisibility;
}
