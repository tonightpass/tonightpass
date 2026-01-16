import type { Endpoint } from "../../endpoints";
import type { ArrayOptions, ArrayResult, OrganizationEvent } from "..";
import type { UserPost } from "../users/posts";

export enum FeedType {
  Following = "following",
  Discover = "discover",
}

export type FeedPost = UserPost | OrganizationEvent[];

export type FeedEndpoints =
  | Endpoint<
      "GET",
      "/feed/following",
      ArrayResult<FeedPost>,
      ArrayOptions<FeedPost>
    >
  | Endpoint<
      "GET",
      "/feed/discover",
      ArrayResult<FeedPost>,
      ArrayOptions<FeedPost>
    >;
