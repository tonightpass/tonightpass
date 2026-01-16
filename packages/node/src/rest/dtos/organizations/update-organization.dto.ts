import {
  ArrayMaxSize,
  IsArray,
  IsLowercase,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
} from "class-validator";
import { REGEX } from "../../../constants";
import type { UpdateOrganizationMemberDto } from "./members";

export class UpdateOrganizationDto {
  @IsOptional()
  @IsString()
  @IsLowercase()
  @Length(3, 48)
  @Matches(REGEX.USERNAME, {
    message: "organization.slug.format",
  })
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
  @Matches(REGEX.ORGANIZATION_AVATAR_URL)
  avatarUrl?: string;

  @IsOptional()
  @Matches(REGEX.ORGANIZATION_BANNER_URL)
  bannerUrl?: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  @ArrayMaxSize(5)
  links?: string[];
}
