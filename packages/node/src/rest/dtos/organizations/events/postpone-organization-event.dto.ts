import { IsBoolean, IsOptional, IsString, Length } from "class-validator";

export class PostponeOrganizationEventDto {
  @IsOptional()
  @IsString()
  @Length(1, 500)
  reason?: string;

  @IsOptional()
  @IsBoolean()
  notifyHolders?: boolean;
}
