import { IsEnum, IsOptional } from "class-validator";

import { OrganizationMemberRole } from "../../../types";

export class CreateOrganizationMemberInvitationLinkDto {
  @IsEnum(OrganizationMemberRole)
  @IsOptional()
  role?: OrganizationMemberRole;
}
