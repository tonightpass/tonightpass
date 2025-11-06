import { Endpoint } from "../../../../endpoints";

export type UserPostViewEndpoints = Endpoint<
  "POST",
  "/users/@:username/posts/:postId/views",
  boolean,
  null
>;
