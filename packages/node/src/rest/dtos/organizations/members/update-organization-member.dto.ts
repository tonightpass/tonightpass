import { IsEnum, IsNotEmpty } from "class-validator";

import { OrganizationMemberRole } from "../../../types";

export class UpdateOrganizationMemberDto {
  @IsEnum(OrganizationMemberRole)
  @IsNotEmpty()
  role: OrganizationMemberRole;
}
