import { IsArray, IsString } from "class-validator";

export class CreateOrganizationEventOrderDto {
  @IsArray()
  @IsString({ each: true })
  cart: string[];
}
