import { Base, ArrayResult, ArrayOptions, UserProfile } from "../..";
import { UserPostCommentEndpoints } from "./comments";
import { UserPostMedia, UserPostMediaEndpoints } from "./media";
import { UserPostRepostEndpoints } from "./reposts";
import { UserPostViewEndpoints } from "./views";
import {
  CreateUserPostDto,
  UpdateUserPostDto,
} from "../../../dtos/users/posts";
import { Endpoint } from "../../../endpoints";

export enum UserPostVisibility {
  Public = "public",
  Followers = "followers",
  Private = "private",
}

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

export type UserPostEndpoints =
  | Endpoint<
      "GET",
      "/users/@:username/posts",
      ArrayResult<UserPost>,
      ArrayOptions<UserPost>
    >
  | Endpoint<"GET", "/users/@:username/posts/:postId", UserPost>
  | Endpoint<"POST", "/users/~me/posts", UserPost, CreateUserPostDto>
  | Endpoint<"PUT", "/users/~me/posts/:postId", UserPost, UpdateUserPostDto>
  | Endpoint<"DELETE", "/users/~me/posts/:postId", void, undefined>
  | UserPostCommentEndpoints
  | UserPostRepostEndpoints
  | UserPostViewEndpoints
  | UserPostMediaEndpoints;

export * from "./comments";
export * from "./reposts";
export * from "./media";
export * from "./views";
