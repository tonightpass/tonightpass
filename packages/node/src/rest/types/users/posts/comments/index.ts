import {
  ArrayResult,
  ArrayOptions,
  UserPost,
  UserProfile,
  Base,
} from "../../..";
import {
  CreateUserPostCommentDto,
  UpdateUserPostCommentDto,
} from "../../../../dtos/users/posts/comments";
import { Endpoint } from "../../../../endpoints";

export type UserPostComment = Base & {
  post: UserPost;
  author: UserProfile;
  content: string;
  replyTo?: UserPostComment;
  isEdited: boolean;
  editedAt?: Date;
};

export type UserPostCommentEndpoints =
  | Endpoint<
      "GET",
      "/users/@:username/posts/:postId/comments",
      ArrayResult<UserPostComment>,
      ArrayOptions<UserPostComment>
    >
  | Endpoint<
      "POST",
      "/users/~me/posts/:postId/comments",
      UserPostComment,
      CreateUserPostCommentDto
    >
  | Endpoint<
      "PUT",
      "/users/~me/posts/:postId/comments/:commentId",
      UserPostComment,
      UpdateUserPostCommentDto
    >
  | Endpoint<
      "DELETE",
      "/users/~me/posts/:postId/comments/:commentId",
      void,
      null
    >;
