import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from "class-validator";

import {
  OrganizationMemberRole,
  type Location,
  type OrganizationSocialLink,
} from "../../types";

export class CreateOrganizationDto {
  @IsOptional()
  @IsString()
  @Length(1, 128)
  slug?: string;

  @IsObject()
  identity: CreateOrganizationIdentityDto;

  @IsArray()
  members: OrganizationMemberDto[];

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
  @IsNotEmpty()
  @Length(16, 1024)
  description: string;

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

export class OrganizationMemberDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsEnum(OrganizationMemberRole)
  @IsNotEmpty()
  role: OrganizationMemberRole;
}
