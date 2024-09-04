import { IsEnum } from "class-validator";

import { Location, UserIdentifier, UserIdentityGender } from "../../types";

export class CreateUserDto {
  identifier: UserIdentifier;
  password: string;
  identity: CreateUserIdentituDto;
  addresses: Location[];
}

class CreateUserIdentituDto {
  firstName: string;
  lastName: string;

  @IsEnum(UserIdentityGender)
  gender: UserIdentityGender;

  avatarUrl?: string;
  birthDate: Date;
}
