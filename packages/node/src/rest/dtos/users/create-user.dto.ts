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
  gender: UserIdentityGender;
  profilePictureUrl?: string;
  birthDate: Date;
}
