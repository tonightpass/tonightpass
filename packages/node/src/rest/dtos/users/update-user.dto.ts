import { Type } from "class-transformer";
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsLowercase,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";

import { REGEX } from "../../../constants/regex";
import { UserIdentifier, UserIdentity, UserIdentityGender } from "../../types";

export class UpdateUserDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUserIdentifierDto)
  identifier?: UpdateUserIdentifierDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUserIdentityDto)
  identity?: UpdateUserIdentityDto;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password?: string;
}

class UpdateUserIdentifierDto
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

  @IsOptional()
  @IsString()
  @IsLowercase()
  @Length(3, 48)
  @Matches(REGEX.USERNAME)
  username?: string;
}

class UpdateUserIdentityDto
  implements
    Partial<
      Pick<
        UserIdentity,
        | "firstName"
        | "lastName"
        | "displayName"
        | "description"
        | "avatarUrl"
        | "bannerUrl"
        | "gender"
        | "birthDate"
      >
    >
{
  @IsOptional()
  @IsString()
  @Length(2, 32)
  @Matches(REGEX.NAME, {
    message: "First name must be composed of letters only",
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 32)
  @Matches(REGEX.NAME, {
    message: "Last name must be composed of letters only",
  })
  lastName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 32)
  displayName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 128)
  description?: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string | undefined;

  @IsOptional()
  @IsUrl()
  bannerUrl?: string | undefined;

  @IsOptional()
  @IsEnum(UserIdentityGender)
  gender?: UserIdentityGender;

  @IsOptional()
  @IsDateString()
  birthDate?: Date;
}
