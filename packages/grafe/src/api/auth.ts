import { CreateUserDto, SignInUserDto, User } from "@tonightpass/shared-types";

import { SIGN_IN } from "./store/auth/sign-in.query";
import { SIGN_UP } from "./store/auth/sign-up.query";
import { REST } from "../REST";
import { APIResponse } from "../types/api-response";

export class AuthAPI {
  public constructor(private readonly rest: REST) {}

  public async signIn(signInDto: SignInUserDto): Promise<APIResponse<User>> {
    const result = await this.rest.mutate(SIGN_IN, {
      signInInput: signInDto,
    });

    if (!result.success) {
      return [null, result.error];
    }

    return [result.data.signIn, null];
  }

  public async signUp(signUpDto: CreateUserDto): Promise<APIResponse<User>> {
    const result = await this.rest.mutate(SIGN_UP, {
      createUserInput: signUpDto,
    });

    if (!result.success) {
      return [null, result.error];
    }

    return [result.data.signUp, null];
  }
}
