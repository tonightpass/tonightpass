import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUrl,
} from "class-validator";

import {
  Location,
  OrganizationMember,
  OrganizationSocialLink,
} from "../../types";

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsObject()
  identity: CreateOrganizationIdentityDto;

  @IsArray()
  members: OrganizationMember[];

  @IsObject()
  location?: Location;
}

class CreateOrganizationIdentityDto {
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsString()
  @IsNotEmpty()
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
  socialLinks: OrganizationSocialLink[];
}
