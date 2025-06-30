import { IsNotEmpty, IsString } from "class-validator";

export class RecoveryDto {
  @IsNotEmpty({ message: "Identifier is required" })
  @IsString({ message: "Identifier must be a string" })
  identifier: string;
}
