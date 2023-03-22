import { CreateUserDto, User } from "@tonightpass/shared-types";

import { REST } from "../REST";
import { SIGN_UP } from "./store/auth/sign-up.query";

export class AuthAPI {
  public constructor(private readonly rest: REST) {}

  public async signUp(signUpDto: CreateUserDto): Promise<User> {
    return await this.rest.mutate<User>(SIGN_UP, {
      createUserInput: signUpDto,
    });
  }
}
