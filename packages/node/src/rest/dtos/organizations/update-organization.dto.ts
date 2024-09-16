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

import { UpdateOrganizationEventDto } from "./events";
import { REGEX } from "../../../constants";
import { OrganizationSocialLink } from "../../types";

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
  members?: UpdateOrganizationEventDto[];

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

  @IsUrl({
    protocols: ["http", "https"],
  })
  @IsOptional()
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
