import { User } from "@tonightpass/shared-types";

import { sdk } from "./builder";
import { UpdateUserDto } from "../rest";

export const users = sdk((client) => ({
  me: {
    get: async () => client.get<User>("/users/me"),
    update: async (data: UpdateUserDto) =>
      client.put<User>("/users/me", { data }),
  },
}));
