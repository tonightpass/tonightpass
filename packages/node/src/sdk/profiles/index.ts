import { profilesRelationships } from "./relationships";
import { sdk } from "../builder";

export const profiles = sdk((client) => ({
  get: async (username: string) =>
    client.get("/profiles/:username", { username }),
  relationships: profilesRelationships(client),
}));
