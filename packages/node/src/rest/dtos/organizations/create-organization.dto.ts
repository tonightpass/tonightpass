import { IsArray, IsNotEmpty, IsObject, IsString } from "class-validator";

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

  @IsArray()
  socialLinks?: OrganizationSocialLink[];

  @IsObject()
  location?: Location;
}
