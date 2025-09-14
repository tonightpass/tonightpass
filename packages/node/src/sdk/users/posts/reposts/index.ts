import { CreateUserPostRepostDto } from "../../../../rest/dtos/users/posts/reposts";
import { ArrayOptions } from "../../../../rest/types";
import { UserPostRepost } from "../../../../rest/types/users/posts/reposts";
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
    client.post("/users/@me/posts/:postId/reposts", data || {}, { postId }),

  delete: async (postId: string) =>
    client.delete("/users/@me/posts/:postId/reposts", undefined, { postId }),
}));
