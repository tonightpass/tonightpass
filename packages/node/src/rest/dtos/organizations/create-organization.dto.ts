import {
  IsArray,
  IsLowercase,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from "class-validator";

import { CreateOrganizationMemberDto } from "./members/create-organization-member.dto";
import { type Location, type OrganizationSocialLink } from "../../types";

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

  @IsUrl({
    protocols: ["http", "https"],
  })
  avatarUrl?: string;

  @IsOptional()
  @IsUrl({
    protocols: ["http", "https"],
  })
  bannerUrl?: string;

  @IsOptional()
  @IsArray()
  socialLinks?: OrganizationSocialLink[];
}
