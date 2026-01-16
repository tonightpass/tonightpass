import type {
  CreateUserPostDto,
  UpdateUserPostDto,
} from "../../../dtos/users/posts";
import type { Endpoint } from "../../../endpoints";
import type { ArrayOptions, ArrayResult, Base, UserProfile } from "../..";
import type { UserPostCommentEndpoints } from "./comments";
import type { UserPostMedia, UserPostMediaEndpoints } from "./media";
import type { UserPostRepostEndpoints } from "./reposts";
import type { UserPostViewEndpoints } from "./views";

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
export * from "./media";
export * from "./reposts";
export * from "./views";
