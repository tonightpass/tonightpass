import { User, UserIdentifier } from "@tonightpass/shared-types";

import { REST } from "../REST";
import { GET_USER } from "./store/users/get-user.query";
import { IDENTIFY_USER } from "./store/users/identify-user.query";
import { APIResponse } from "../types/api-response";

export class UsersAPI {
  public constructor(private readonly rest: REST) {}

  public async get(userId: string): Promise<APIResponse<User>> {
    const result = await this.rest.query(GET_USER, { userId });

    if (!result.success) {
      return [null, result.error];
    }

    return [result.data, null];
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

    return [result.data, null];
  }
}
