import { CreateUserDto, SignInUserDto, User } from "@tonightpass/shared-types";

import { REST } from "../REST";
import { SIGN_UP } from "./store/auth/sign-up.query";
import { SIGN_IN } from "./store/auth/sign-in.query";
import { APIResponse } from "../types/api-response";

export class AuthAPI {
  public constructor(private readonly rest: REST) {}

  public async signIn(signInDto: SignInUserDto): Promise<APIResponse<User>> {
    const result = await this.rest.mutate<User>(SIGN_IN, {
      signInInput: signInDto,
    });

    if (!result.success) {
      return [null, result.error];
    }

    return [result.data, null];
  }

  public async signUp(signUpDto: CreateUserDto): Promise<APIResponse<User>> {
    const result = await this.rest.mutate<User>(SIGN_UP, {
      createUserInput: signUpDto,
    });

    if (!result.success) {
      return [null, result.error];
    }

    return [result.data, null];
  }
}
