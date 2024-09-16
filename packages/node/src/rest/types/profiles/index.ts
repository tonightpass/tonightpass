import { Endpoint } from "../../endpoints";
import { OrganizationIdentity } from "../organizations";
import { UserIdentity } from "../users";

export type ProfileType = "user" | "organization";

export interface Profile {
  type: ProfileType;

  displayName: string;
  description?: string;

  avatarUrl?: string;
  bannerUrl?: string;

  metadata: ProfileMetadata;

  createdAt: Date;
}

export interface ProfileMetadata {
  followersCount: number;

  isBlocked: boolean;
  hasBlocked: boolean;
  canDM: boolean;
}

export type ProfileEndpoints =
  | Endpoint<"GET", "/profiles/:username", UserIdentity | OrganizationIdentity>
  | Endpoint<"POST", "/profiles/:username/relationships/follow", void, null>
  | Endpoint<"POST", "/profiles/:username/relationships/unfollow", void, null>;
