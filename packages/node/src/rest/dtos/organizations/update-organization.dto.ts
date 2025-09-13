import {
  IsArray,
  IsLowercase,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  ArrayMaxSize,
} from "class-validator";

import { UpdateOrganizationMemberDto } from "./members";
import { REGEX } from "../../../constants";

export class UpdateOrganizationDto {
  @IsOptional()
  @IsString()
  @IsLowercase()
  @Length(3, 48)
  @Matches(REGEX.USERNAME)
  slug?: string;

  @IsObject()
  @IsOptional()
  identity?: UpdateOrganizationIdentityDto;

  @IsOptional()
  @IsArray()
  members?: UpdateOrganizationMemberDto[];

  @IsOptional()
  @IsObject()
  location?: Location;
}

export class UpdateOrganizationIdentityDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 32)
  @IsOptional()
  displayName?: string;

  @IsString()
  @Length(16, 1024)
  @IsOptional()
  description?: string;

  @IsOptional()
  @Matches(
    /^https:\/\/(cdn\.staging\.tonightpass\.com|cdn\.tonightpass\.com)\/organizations\/[\w-]+\/avatars\//,
  )
  avatarUrl?: string;

  @IsOptional()
  @Matches(
    /^https:\/\/(cdn\.staging\.tonightpass\.com|cdn\.tonightpass\.com)\/organizations\/[\w-]+\/banners\//,
  )
  bannerUrl?: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  @ArrayMaxSize(5)
  links?: string[];
}
