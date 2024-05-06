import { IsEnum, IsNotEmpty, IsString } from "class-validator";

import { OrganizationMemberRole } from "../../../types";

export class CreateOrganizationMemberDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsEnum(OrganizationMemberRole)
  @IsNotEmpty()
  role: OrganizationMemberRole;
}
