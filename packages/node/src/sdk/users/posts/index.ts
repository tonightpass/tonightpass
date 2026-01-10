import { usersPostsViews } from "./views";
import {
  CreateUserPostDto,
  UpdateUserPostDto,
} from "../../../rest/dtos/users/posts";
import { ArrayOptions } from "../../../rest/types";
import { UserPost } from "../../../rest/types/users/posts";
import { sdk } from "../../builder";

export const usersPosts = sdk((client) => ({
  getByUsername: async (username: string, options?: ArrayOptions<UserPost>) =>
    client.get("/users/@:username/posts", { username, ...options }),

  getByUsernameAndId: async (username: string, postId: string) =>
    client.get("/users/@:username/posts/:postId", { username, postId }),

  create: async (data: CreateUserPostDto) =>
    client.post("/users/~me/posts", data),

  update: async (postId: string, data: UpdateUserPostDto) =>
    client.put("/users/~me/posts/:postId", data, { postId }),

  delete: async (postId: string) =>
    client.delete("/users/~me/posts/:postId", null, { postId }),

  uploadMedia: async (file: FormData) =>
    client.post("/users/~me/posts/media", file),

  views: usersPostsViews(client),
}));
