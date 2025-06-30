import { IsNotEmpty, IsString, Matches } from "class-validator";

import { REGEX } from "../../../constants/regex";

export class RecoveryResetDto {
  @IsString()
  @IsNotEmpty()
  tokenId: string;

  @IsString()
  @IsNotEmpty()
  tokenValue: string;

  @Matches(REGEX.PASSWORD_MIN_LENGTH, {
    message: "Password must be at least 8 characters long.",
  })
  @Matches(REGEX.PASSWORD_UPPERCASE, {
    message: "Password must contain at least one uppercase letter.",
  })
  @Matches(REGEX.PASSWORD_LOWERCASE, {
    message: "Password must contain at least one lowercase letter.",
  })
  @Matches(REGEX.PASSWORD, {
    message: "Password must be secure.",
  })
  @IsNotEmpty({ message: "Password is required" })
  password: string;
}
