import { profilesRelationships } from "./relationships";
import { ArrayOptions, OrganizationIdentity, UserIdentity } from "../../rest";
import { sdk } from "../builder";

export const profiles = sdk((client) => ({
  get: async (username: string) =>
    client.get("/profiles/:username", { username }),
  getSuggestions: async (
    options: ArrayOptions<UserIdentity | OrganizationIdentity>,
  ) => client.get("/profiles/suggestions", options),
  relationships: profilesRelationships(client),
}));
