import { IsEnum } from "class-validator";

import { UserIdentifier, UserIdentityGender } from "../../types";

export class CreateUserDto {
  identifier: UserIdentifier;
  password: string;
  identity: CreateUserIdentityDto;
}

export class CreateUserIdentityDto {
  firstName: string;
  lastName: string;

  @IsEnum(UserIdentityGender)
  gender: UserIdentityGender;

  avatarUrl?: string;
  birthDate: Date;
}
