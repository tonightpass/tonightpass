import { sdk } from "./builder";
import { UpdateUserDto } from "../rest";

export const users = sdk((client) => ({
  getAll: async () => client.get("/users"),
  get: async (id: string) => client.get("/users", { id }),
  me: async () => client.get("/users/me"),
  check: async (identifier: string, suggestions?: boolean) =>
    client.get("/users/check/:identifier", { identifier, suggestions }),
  update: async (userId: string, data: UpdateUserDto) =>
    client.put("/users/:userId", data, { userId }),
}));
