import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateOrganizationEventOrderDto {
  @IsArray()
  @IsString({ each: true })
  cart: string[];

  @IsOptional()
  @IsString()
  promoCode?: string;
}
