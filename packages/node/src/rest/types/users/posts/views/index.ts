import type { Endpoint } from "../../../../endpoints";

export type UserPostViewOptions = {
  posts: string | string[];
};

export type UserPostViewResult = {
  postId: string;
  visitsCount: number;
};

export type UserPostViewEndpoints =
  | Endpoint<"POST", "/users/@:username/posts/:postId/views", boolean, null>
  | Endpoint<
      "GET",
      "/users/posts/views/stream",
      ReadableStream<UserPostViewResult>,
      UserPostViewOptions
    >;
