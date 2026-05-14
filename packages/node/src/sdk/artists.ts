import type { Query } from "pathcat";

import { sdk } from "./builder";

export const artists = sdk((client) => ({
  search: async (query: Query<"/artists/search">) =>
    client.get("/artists/search", query),
  get: async (query: Query<"/artists/:idOrPermalink">) =>
    client.get("/artists/:idOrPermalink", query),
  follow: async (query: Query<"/artists/:idOrPermalink/follow">) =>
    client.post("/artists/:idOrPermalink/follow", undefined, query),
  unfollow: async (query: Query<"/artists/:idOrPermalink/follow">) =>
    client.delete("/artists/:idOrPermalink/follow", undefined, query),
  events: async (query: Query<"/artists/:idOrPermalink/events">) =>
    client.get("/artists/:idOrPermalink/events", query),
}));
