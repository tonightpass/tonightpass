import type { CreateUserPostRepostDto } from "../../../../dtos/users/posts/reposts";
import type { Endpoint } from "../../../../endpoints";
import type {
  ArrayOptions,
  ArrayResult,
  Base,
  UserPost,
  UserProfile,
} from "../../..";

export type UserPostRepost = Base & {
  originalPost: UserPost;
  author: UserProfile;
  comment?: string;
};

export type UserPostRepostEndpoints =
  | Endpoint<
      "GET",
      "/users/@:username/reposts",
      ArrayResult<UserPostRepost>,
      ArrayOptions<UserPostRepost>
    >
  | Endpoint<
      "GET",
      "/users/@:username/posts/:postId/reposts",
      ArrayResult<UserPostRepost>,
      ArrayOptions<UserPostRepost>
    >
  | Endpoint<
      "POST",
      "/users/~me/posts/:postId/reposts",
      UserPostRepost,
      CreateUserPostRepostDto
    >
  | Endpoint<"DELETE", "/users/~me/posts/:postId/reposts", void, undefined>;
