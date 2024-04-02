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
  name: string;

  @IsArray()
  members?: OrganizationMember[];

  @IsString()
  @IsUrl({
    protocols: ["http", "https"],
  })
  logoUrl?: string;

  @IsArray()
  socialLinks?: OrganizationSocialLink[];

  @IsObject()
  location?: Location;
}
