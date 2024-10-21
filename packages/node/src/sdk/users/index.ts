import { UpdateUserDto } from "../../rest";
import { sdk } from "../builder";

export const users = sdk((client) => ({
  getAll: async () => client.get("/users"),
  getSuggestions: async () => client.get("/users/suggestions"),
  get: async (userId: string) => client.get("/users/:userId", { userId }),
  me: async () => client.get("/users/@me"),
  check: async (identifier: string, suggestions?: boolean) =>
    client.get("/users/check/:identifier", { identifier, suggestions }),
  update: async (userId: string, data: UpdateUserDto) =>
    client.put("/users/:userId", data, { userId }),
}));
