import { IsOptional, IsString, Length, Matches } from "class-validator";

export class ConfirmOrganizationEventClaimDto {
  /** The 6 digit code sent to the organiser's scraped email address. */
  @IsString()
  @Matches(/^\d{6}$/)
  code: string;

  /**
   * Existing organization to move the event into. When omitted, one is created
   * from the organiser name we scraped, so a first-time claimer has nothing to
   * set up beforehand.
   */
  @IsOptional()
  @IsString()
  @Length(1, 64)
  organizationSlug?: string;
}
