import {
  CreateUserPostCommentDto,
  UpdateUserPostCommentDto,
} from "../../../../rest/dtos/users/posts/comments";
import { ArrayOptions } from "../../../../rest/types";
import { UserPostComment } from "../../../../rest/types/users/posts/comments";
import { sdk } from "../../../builder";

export const usersPostsComments = sdk((client) => ({
  getByPost: async (
    username: string,
    postId: string,
    options?: ArrayOptions<UserPostComment>,
  ) =>
    client.get("/users/@:username/posts/:postId/comments", {
      username,
      postId,
      ...options,
    }),

  create: async (postId: string, data: CreateUserPostCommentDto) =>
    client.post("/users/~me/posts/:postId/comments", data, { postId }),

  update: async (
    postId: string,
    commentId: string,
    data: UpdateUserPostCommentDto,
  ) =>
    client.put("/users/~me/posts/:postId/comments/:commentId", data, {
      postId,
      commentId,
    }),

  delete: async (postId: string, commentId: string) =>
    client.delete("/users/~me/posts/:postId/comments/:commentId", null, {
      postId,
      commentId,
    }),
}));
