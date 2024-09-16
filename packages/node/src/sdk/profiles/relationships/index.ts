import { sdk } from "../../builder";

export const profilesRelationships = sdk((client) => ({
  follow: async (username: string) =>
    client.post("/profiles/:username/relationships/follow", null, {
      username,
    }),
  unfollow: async (username: string) =>
    client.post("/profiles/:username/relationships/unfollow", null, {
      username,
    }),
}));
