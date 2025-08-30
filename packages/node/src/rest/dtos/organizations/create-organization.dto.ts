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
} from "class-validator";

import { CreateOrganizationMemberDto } from "./members/create-organization-member.dto";
import { type Location } from "../../types";

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
  @Length(0, 5)
  links?: string[];
}
