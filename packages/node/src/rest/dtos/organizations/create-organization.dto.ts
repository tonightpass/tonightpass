import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUrl,
  Length,
} from "class-validator";

import {
  Location,
  OrganizationMemberRole,
  OrganizationSocialLink,
} from "../../types";

export class CreateOrganizationDto {
  @IsString()
  @Length(1, 128)
  slug?: string;

  @IsObject()
  identity: CreateOrganizationIdentityDto;

  @IsArray()
  @ArrayMinSize(1)
  members: OrganizationMemberDto[];

  @IsObject()
  location?: Location;
}

class CreateOrganizationIdentityDto {
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

  @IsUrl({
    protocols: ["http", "https"],
  })
  bannerUrl?: string;

  @IsArray()
  socialLinks?: OrganizationSocialLink[];
}

class OrganizationMemberDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsEnum(OrganizationMemberRole)
  @IsNotEmpty()
  role: OrganizationMemberRole;
}
