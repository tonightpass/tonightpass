import { IdentifyUserDto, User } from "@tonightpass/shared-types";

import { REST } from "../REST";
import { GET_USER } from "./store/users/get-user.query";
import { IDENTIFY_USER } from "./store/users/identify-user.query";

export class UsersAPI {
  public constructor(private readonly rest: REST) {}

  public async get(userId: string): Promise<User> {
    const data = await this.rest.query<User>(GET_USER, { userId });

    return data.getUser;
  }

  public async identify(identifyUserDto: IdentifyUserDto): Promise<boolean> {
    const data = await this.rest.query<boolean>(IDENTIFY_USER, {
      identifyUserInput: identifyUserDto,
    });

    return data.identifyUser;
  }
}
