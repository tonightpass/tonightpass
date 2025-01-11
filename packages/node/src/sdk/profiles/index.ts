import { profilesRelationships } from "./relationships";
import { sdk } from "../builder";

export const profiles = sdk((client) => ({
  get: async (username: string) =>
    client.get("/profiles/:username", { username }),
  search: async (query: string) =>
    client.get("/profiles/search?q=:query", { query }),
  relationships: profilesRelationships(client),
}));
