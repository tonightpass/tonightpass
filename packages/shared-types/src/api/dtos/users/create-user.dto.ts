import { Location } from "../../..";
import { UserIdentifier, UserIdentityGender } from "../../../user";

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
