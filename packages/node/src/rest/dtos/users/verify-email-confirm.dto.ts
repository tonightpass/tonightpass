import { IsNotEmpty, IsString } from "class-validator";

export class VerifyEmailConfirmDto {
  @IsString()
  @IsNotEmpty()
  tokenId: string;

  @IsString()
  @IsNotEmpty()
  tokenValue: string;
}
