import { IsEmail, IsOptional, MaxLength } from "class-validator";

export class CreateOrganizationEventInterestDto {
  /**
   * Only filled when the visitor asks to be told once the event becomes
   * bookable here. Everything else about them comes from the session cookie,
   * so pressing the button never requires an account.
   */
  @IsOptional()
  @IsEmail()
  @MaxLength(320)
  email?: string;
}
