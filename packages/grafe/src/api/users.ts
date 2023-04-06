import { User, UserIdentifier } from "@tonightpass/shared-types";

import { REST } from "../REST";
import { GET_USER } from "./store/users/get-user.query";
import { IDENTIFY_USER } from "./store/users/identify-user.query";

export class UsersAPI {
  public constructor(private readonly rest: REST) {}

  public async get(userId: string): Promise<User> {
    const data = await this.rest.query(GET_USER, { userId });

    return data.getUser;
  }

  public async identify(identifier: string): Promise<UserIdentifier> {
    const data = await this.rest.query(IDENTIFY_USER, {
      identifier,
    });

    return data.identifyUser;
  }
}
