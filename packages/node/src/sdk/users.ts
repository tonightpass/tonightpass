import { sdk } from "./builder";
import { UpdateUserDto } from "../rest";

export const users = sdk((client) => ({
  getAll: async () => client.get("/users"),
  get: async (id: string) => client.get("/users", { id }),
  me: async () => client.get("/users/me"),
  check: async (identifier: string) =>
    client.get("/check/:identifier", { identifier }),
  update: async (id: string, data: UpdateUserDto) =>
    client.put("/users/:id", data, { id }),
}));
