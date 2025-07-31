import { IsNotEmpty, IsString } from "class-validator";

export class AcceptOrganizationMemberInvitationDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}
