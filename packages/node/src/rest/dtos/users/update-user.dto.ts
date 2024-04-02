import { Type } from "class-transformer";
import {
  IsDateString,
  IsEmail,
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

import { NAME_REGEX } from "../../../constants/regex";
import { UserIdentifier, UserIdentity } from "../../types";

export class UpdateUserDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateIdentifierDto)
  identifier?: UpdateIdentifierDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateIdentityDto)
  identity?: UpdateIdentityDto;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(130)
  password?: string;
}

class UpdateIdentifierDto
  implements
    Partial<Pick<UserIdentifier, "email" | "phoneNumber" | "username">>
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
  @MinLength(3)
  username?: string;
}

class UpdateIdentityDto
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
  @Length(2, 50)
  @Matches(NAME_REGEX, {
    message: "First name must be composed of letters only",
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  @Matches(NAME_REGEX, {
    message: "Last name must be composed of letters only",
  })
  lastName?: string;

  @IsOptional()
  @IsString()
  @Length(1, 32)
  displayName?: string;

  @IsOptional()
  @IsString()
  @Length(15, 500)
  description?: string;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string | undefined;

  @IsOptional()
  @IsUrl()
  bannerUrl?: string | undefined;

  @IsOptional()
  gender?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: Date;
}
