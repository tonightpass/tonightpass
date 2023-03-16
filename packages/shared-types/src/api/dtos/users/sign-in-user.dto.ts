import { UserIdentifier } from "../../../user";

export class SignInUserDto {
  identifier: UserIdentifier;
  password: string;
}
