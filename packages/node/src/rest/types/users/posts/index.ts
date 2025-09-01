import { Base, ArrayResult, ArrayOptions, UserProfile } from "../..";
import { Endpoint } from "../../../endpoints";

export type CreateUserPostDto = {
  content?: string;
  mediaIds: string[];
  visibility?: UserPostVisibility;
};

export type UpdateUserPostDto = {
  content?: string;
  visibility?: UserPostVisibility;
};

export type CreateUserPostCommentDto = {
  content: string;
  replyToId?: string;
};

export type UpdateUserPostCommentDto = {
  content: string;
};

export type CreateUserPostRepostDto = {
  comment?: string;
};

export type UserPost = Base & {
  author: UserProfile;
  content?: string;
  media: UserPostMedia[];
  visibility: UserPostVisibility;
  metrics: {
    reposts: number;
    comments: number;
    views: number;
  };
  isReposted?: boolean;
  isEdited: boolean;
  editedAt?: Date;
};

export type UserPostMedia = {
  url: string;
  type: UserPostMediaType;
  width: number;
  height: number;
  description?: string;
  isNSFW: boolean;
  thumbnailUrl?: string;
  duration?: number;
};

export enum UserPostMediaType {
  Image = "image",
  Video = "video",
}

export enum UserPostVisibility {
  Public = "public",
  Followers = "followers",
  Private = "private",
}

export type UserPostComment = Base & {
  post: UserPost;
  author: UserProfile;
  content: string;
  replyTo?: UserPostComment;
  isEdited: boolean;
  editedAt?: Date;
};

export type UserPostRepost = Base & {
  originalPost: UserPost;
  author: UserProfile;
  comment?: string;
};

export type UserPostEndpoints =
  | Endpoint<
      "GET",
      "/users/:username/posts",
      ArrayResult<UserPost>,
      ArrayOptions<UserPost>
    >
  | Endpoint<"GET", "/users/:username/posts/:postId", UserPost>
  | Endpoint<
      "GET",
      "/users/:username/reposts",
      ArrayResult<UserPostRepost>,
      ArrayOptions<UserPostRepost>
    >
  | Endpoint<"POST", "/users/@me/posts", UserPost, CreateUserPostDto>
  | Endpoint<"PUT", "/users/@me/posts/:postId", UserPost, UpdateUserPostDto>
  | Endpoint<"DELETE", "/users/@me/posts/:postId", void>
  | Endpoint<"POST", "/users/@me/posts/media", UserPostMedia, FormData>
  | Endpoint<"POST", "/users/:username/posts/:postId/views", boolean, null>
  | Endpoint<
      "GET",
      "/users/:username/posts/:postId/reposts",
      ArrayResult<UserPostRepost>,
      ArrayOptions<UserPostRepost>
    >
  | Endpoint<
      "POST",
      "/users/@me/posts/:postId/repost",
      UserPostRepost,
      CreateUserPostRepostDto
    >
  | Endpoint<"DELETE", "/users/@me/posts/:postId/repost", void>
  | Endpoint<
      "GET",
      "/users/:username/posts/:postId/comments",
      ArrayResult<UserPostComment>,
      ArrayOptions<UserPostComment>
    >
  | Endpoint<
      "POST",
      "/users/@me/posts/:postId/comments",
      UserPostComment,
      CreateUserPostCommentDto
    >
  | Endpoint<
      "PUT",
      "/users/@me/posts/:postId/comments/:commentId",
      UserPostComment,
      UpdateUserPostCommentDto
    >
  | Endpoint<"DELETE", "/users/@me/posts/:postId/comments/:commentId", void>;
