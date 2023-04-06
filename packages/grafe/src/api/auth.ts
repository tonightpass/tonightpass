import { CreateUserDto, SignInUserDto, User } from "@tonightpass/shared-types";

import { REST } from "../REST";
import { SIGN_UP } from "./store/auth/sign-up.query";
import { SIGN_IN } from "./store/auth/sign-in.query";

export class AuthAPI {
  public constructor(private readonly rest: REST) {}

  public async signIn(signInDto: SignInUserDto): Promise<User> {
    const data = await this.rest.mutate(SIGN_IN, {
      signInInput: signInDto,
    });

    return data.signIn;
  }

  public async signUp(signUpDto: CreateUserDto): Promise<User> {
    const data = await this.rest.mutate(SIGN_UP, {
      createUserInput: signUpDto,
    });

    return data.signUp;
  }
}
