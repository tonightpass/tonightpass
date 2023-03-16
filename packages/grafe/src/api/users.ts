import { User } from "@tonightpass/shared-types";

import { REST } from "../REST";
import { APIResponse } from "../types/api-response";
import { GET_USER } from "./store/users/get-user.query";
import { IDENTIFY_USER } from "./store/users/identify-user.query";

export class UsersAPI {
  public constructor(private readonly rest: REST) {}

  public async get(userId: string): Promise<APIResponse<User>> {
    return await this.rest.query<User>(GET_USER, { userId });
  }

  public async identify(
    identifyUserDto: IdentifyUserDto
  ): Promise<APIResponse<boolean>> {
    return await this.rest.query<boolean>(IDENTIFY_USER, {
      identifyUserInput: identifyUserDto,
    });
  }
}
