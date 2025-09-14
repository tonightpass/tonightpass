import { ArrayResult, ArrayOptions, OrganizationEvent } from "..";
import { Endpoint } from "../../endpoints";
import { UserPost } from "../users/posts";

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
