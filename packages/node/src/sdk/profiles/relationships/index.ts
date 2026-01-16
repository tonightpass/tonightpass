import type {
  ArrayOptions,
  OrganizationIdentity,
  UserIdentity,
} from "../../../rest";
import { sdk } from "../../builder";

export const profilesRelationships = sdk((client) => ({
  follow: async (username: string) =>
    client.post("/profiles/@:username/relationships/follow", undefined, {
      username,
    }),
  unfollow: async (username: string) =>
    client.post("/profiles/@:username/relationships/unfollow", undefined, {
      username,
    }),
  getSuggestions: async (
    options: ArrayOptions<UserIdentity | OrganizationIdentity>
  ) => client.get("/profiles/~me/relationships/suggestions", options),
  getFollowers: async (
    username: string,
    options: ArrayOptions<UserIdentity | OrganizationIdentity>
  ) =>
    client.get("/profiles/@:username/relationships/followers", {
      username,
      ...options,
    }),
}));
