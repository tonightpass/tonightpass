import { IsBoolean, IsOptional, IsString, Length } from "class-validator";

export class CancelOrganizationEventDto {
  @IsOptional()
  @IsString()
  @Length(1, 500)
  reason?: string;

  @IsOptional()
  @IsBoolean()
  refundOrders?: boolean;

  @IsOptional()
  @IsBoolean()
  notifyHolders?: boolean;

  @IsOptional()
  @IsBoolean()
  allowEndedCancel?: boolean;
}
