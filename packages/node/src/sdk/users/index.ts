import { UpdateUserDto, UserFileType } from "../../rest";
import { buildFileFormData } from "../../utils";
import { sdk } from "../builder";

export const users = sdk((client) => ({
  getAll: async () => client.get("/users"),
  get: async (userId: string) => client.get("/users/:userId", { userId }),
  me: async () => client.get("/users/@me"),
  check: async (identifier: string, suggestions?: boolean) =>
    client.get("/users/check/:identifier", { identifier, suggestions }),
  update: async (userId: string, data: UpdateUserDto) =>
    client.put("/users/:userId", data, { userId }),
  uploadFile: async (
    userId: string,
    userFileType: UserFileType,
    file: File,
  ) => {
    return client.post(
      "/users/:userId/files/:userFileType",
      undefined,
      {
        userId,
        userFileType,
      },
      {
        data: buildFileFormData("file", file),
      },
    );
  },
}));
