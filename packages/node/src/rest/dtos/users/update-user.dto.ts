import { Transform, Type } from "class-transformer";
import {
  ArrayMaxSize,
  IsArray,
  IsDate,
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
  ValidateNested,
} from "class-validator";

import { REGEX } from "../../../constants/regex";
import {
  type UserIdentifier,
  type UserIdentity,
  UserIdentityGender,
} from "../../types";

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
  @Matches(REGEX.USERNAME, {
    message: "user.username.format",
  })
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
  @Matches(REGEX.USER_AVATAR_URL)
  avatarUrl?: string | undefined;

  @IsOptional()
  @Matches(REGEX.USER_BANNER_URL)
  bannerUrl?: string | undefined;

  @IsOptional()
  @IsEnum(UserIdentityGender)
  gender?: UserIdentityGender;

  @IsOptional()
  @Transform(({ value }) => {
    if (!value) {
      return undefined;
    }
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date;
  })
  @IsDate()
  birthDate?: Date;

  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  @ArrayMaxSize(5)
  links?: string[];
}
