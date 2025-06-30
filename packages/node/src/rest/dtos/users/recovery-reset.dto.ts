import { IsNotEmpty, IsString, Matches } from "class-validator";

import { REGEX } from "../../../constants/regex";

export class RecoveryResetDto {
  @IsString({ message: "Token must be a string" })
  @IsNotEmpty({ message: "Token is required" })
  token: string;

  @Matches(REGEX.PASSWORD, {
    message:
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number or special character",
  })
  @IsNotEmpty({ message: "Password is required" })
  password: string;
}
