import {
  IsDate,
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

import { NAME_REGEX } from "../../../const.constants";
import { UserIdentifier, UserIdentity } from "../../../user";

export class UpdateUserDto {
  identifier?: UpdateIdentifierDto;
  identity?: UpdateIdentityDto;

  @IsString()
  @MinLength(6)
  @MaxLength(130)
  password?: string;
}

class UpdateIdentifierDto
  implements
    Partial<Pick<UserIdentifier, "email" | "phoneNumber" | "username">>
{
  @IsString()
  @IsEmail()
  email?: string;

  @IsString()
  @IsPhoneNumber()
  phoneNumber?: string;

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
        | "profilePictureUrl"
        | "bannerUrl"
        | "gender"
        | "birthDate"
      >
    >
{
  @IsString()
  @Length(2, 50)
  @Matches(NAME_REGEX, {
    message: "First name must be composed of letters only",
  })
  firstName?: string;

  @IsString()
  @Length(2, 50)
  @Matches(NAME_REGEX, {
    message: "Last name must be composed of letters only",
  })
  lastName?: string;

  @IsString()
  @Length(4, 100)
  displayName?: string;

  @IsString()
  @Length(10, 500)
  description?: string;

  @IsUrl()
  profilePictureUrl?: string | undefined;

  @IsUrl()
  bannerUrl?: string | undefined;

  gender?: string;

  @IsDate()
  birthDate?: Date;
}
