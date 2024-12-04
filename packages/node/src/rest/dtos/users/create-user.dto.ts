import { Type } from "class-transformer";
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsLowercase,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
  Matches,
  ValidateNested,
} from "class-validator";

import { REGEX } from "../../../constants";
import { UserIdentifier, UserIdentityGender } from "../../types";

export class CreateUserDto {
  @ValidateNested()
  @Type(() => CreateUserIdentifierDto)
  identifier: CreateUserIdentifierDto;

  @ValidateNested()
  @Type(() => CreateUserIdentityDto)
  identity: CreateUserIdentityDto;

  @IsString()
  @Matches(REGEX.PASSWORD_MIN_LENGTH, {
    message: "Password must be at least 8 characters long.",
  })
  @Matches(REGEX.PASSWORD_MAX_LENGTH, {
    message: "Password must be at most 255 characters long.",
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
  password: string;
}

class CreateUserIdentifierDto
  implements Partial<Pick<UserIdentifier, "email" | "phoneNumber" | "username">>
{
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsString()
  @IsString()
  @IsLowercase()
  @Length(3, 48)
  @Matches(REGEX.USERNAME)
  username: string;
}

export class CreateUserIdentityDto {
  @IsOptional()
  @IsString()
  @Length(2, 32)
  @Matches(REGEX.NAME, {
    message: "First name must be composed of letters only",
  })
  firstName: string;

  @IsOptional()
  @IsString()
  @Length(2, 32)
  @Matches(REGEX.NAME, {
    message: "Last name must be composed of letters only",
  })
  lastName: string;

  @IsEnum(UserIdentityGender)
  gender: UserIdentityGender;

  @IsOptional()
  @IsUrl({
    protocols: ["http", "https"],
  })
  avatarUrl?: string;

  @IsOptional()
  @IsDateString()
  birthDate: Date;
}
