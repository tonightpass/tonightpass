import { ArrayOptions, FeedPost } from "../../rest";
import { sdk } from "../builder";

export const feed = sdk((client) => ({
  getFollowing: async (options?: ArrayOptions<FeedPost>) =>
    client.get("/feed/following", options),
  getDiscover: async (options?: ArrayOptions<FeedPost>) =>
    client.get("/feed/discover", options),
}));
