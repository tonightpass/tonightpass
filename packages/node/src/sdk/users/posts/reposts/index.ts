import { ArrayOptions } from "../../../../rest/types";
import {
  CreateUserPostRepostDto,
  UserPostRepost,
} from "../../../../rest/types/users/posts";
import { sdk } from "../../../builder";

export const usersPostsReposts = sdk((client) => ({
  getByUsername: async (
    username: string,
    options?: ArrayOptions<UserPostRepost>,
  ) => client.get("/users/:username/reposts", { username, ...options }),

  getByPost: async (
    username: string,
    postId: string,
    options?: ArrayOptions<UserPostRepost>,
  ) =>
    client.get("/users/:username/posts/:postId/reposts", {
      username,
      postId,
      ...options,
    }),

  create: async (postId: string, data?: CreateUserPostRepostDto) =>
    client.post("/users/@me/posts/:postId/repost", data || {}, { postId }),

  delete: async (postId: string) =>
    client.delete("/users/@me/posts/:postId/repost", { postId }),
}));
