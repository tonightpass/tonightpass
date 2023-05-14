import { User, UserIdentifier } from "@tonightpass/shared-types";

import { GET_USER } from "./store/users/get-user.query";
import { IDENTIFY_USER } from "./store/users/identify-user.query";
import { ME } from "./store/users/me.query";
import { REST } from "../REST";
import { APIResponse } from "../types/api-response";

export class UsersAPI {
  public constructor(private readonly rest: REST) {}

  public async me(): Promise<APIResponse<User>> {
    const result = await this.rest.query(ME);

    if (!result.success) {
      return [null, result.error];
    }

    return [result.data.me, null];
  }

  public async get(userId: string): Promise<APIResponse<User>> {
    const result = await this.rest.query(GET_USER, { userId });

    if (!result.success) {
      return [null, result.error];
    }

    return [result.data.getUser, null];
  }

  public async identify(
    identifier: string
  ): Promise<APIResponse<UserIdentifier>> {
    const result = await this.rest.query(IDENTIFY_USER, {
      identifier,
    });

    if (!result.success) {
      return [null, result.error];
    }

    return [result.data.identifyUser, null];
  }
}
