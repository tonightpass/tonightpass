import { UpdateUserDto, UserFileType } from "../../rest";
import { buildFileFormData } from "../../utils";
import { sdk } from "../builder";
import { usersBookings } from "./bookings";
import { usersNotifications } from "./notifications";
import { usersPosts } from "./posts";
import { usersPostsComments } from "./posts/comments";
import { usersPostsReposts } from "./posts/reposts";

export const users = sdk((client) => ({
  search: async (query: string, limit?: number) =>
    client.get("/users/search", { q: query, limit }),
  getAll: async () => client.get("/users"),
  get: async (userId: string) => client.get("/users/:userId", { userId }),
  me: async () => client.get("/users/@me"),
  check: async (identifier: string, suggestions?: boolean) =>
    client.get("/users/check/:identifier", { identifier, suggestions }),
  update: async (userId: string, data: UpdateUserDto) =>
    client.put("/users/:userId", data, { userId }),
  uploadFile: async (userId: string, userFileType: UserFileType, file: File) =>
    client.post(
      "/users/:userId/files/:userFileType",
      buildFileFormData("file", file),
      {
        userId,
        userFileType,
      },
    ),
  uploadTempFile: async (userFileType: UserFileType, file: File) =>
    client.post("/users/files/:userFileType", buildFileFormData("file", file), {
      userFileType,
    }),
  bookings: usersBookings(client),
  notifications: usersNotifications(client),
  posts: usersPosts(client),
  postsComments: usersPostsComments(client),
  postsReposts: usersPostsReposts(client),
}));
