import { profilesRelationships } from "./relationships";
import { sdk } from "../builder";
import { ArrayOptions, Profile } from "../../rest";

export const profiles = sdk((client) => ({
  getAll: async (options?: ArrayOptions<Profile>) =>
    client.get("/profiles", options),
  search: async (query: string, options?: ArrayOptions<Profile>) =>
    client.get("/profiles/search", { q: query, ...options }),
  get: async (username: string) =>
    client.get("/profiles/:username", { username }),
  relationships: profilesRelationships(client),
}));
