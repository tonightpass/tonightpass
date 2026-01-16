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
import { REGEX } from "../../../constants/regex";
import type { Location } from "../../types";
import type { CreateOrganizationMemberDto } from "./members/create-organization-member.dto";

export class CreateOrganizationDto {
  @IsOptional()
  @IsString()
  @IsLowercase()
  @Length(1, 48)
  organizationSlug?: string;

  @IsObject()
  identity: CreateOrganizationIdentityDto;

  @IsArray()
  members: CreateOrganizationMemberDto[];

  @IsOptional()
  @IsObject()
  location?: Location;
}

export class CreateOrganizationIdentityDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 32)
  displayName: string;

  @IsString()
  @Length(16, 1024)
  @IsOptional()
  description?: string;

  @Matches(REGEX.ORGANIZATION_AVATAR_URL, {
    message: "organization.avatar.url.invalid",
  })
  avatarUrl?: string;

  @IsOptional()
  @Matches(REGEX.ORGANIZATION_BANNER_URL, {
    message: "organization.banner.url.invalid",
  })
  bannerUrl?: string;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  @ArrayMaxSize(5)
  links?: string[];
}
