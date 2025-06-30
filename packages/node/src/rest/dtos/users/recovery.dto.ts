import { IsNotEmpty, IsString } from "class-validator";

export class RecoveryDto {
  @IsNotEmpty()
  @IsString()
  identifier: string;
}
