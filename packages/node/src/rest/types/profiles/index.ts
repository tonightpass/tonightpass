import { Endpoint } from "../../endpoints";
import { OrganizationIdentity } from "../organizations";
import { UserIdentity } from "../users";

export interface Profile {
  type: "user" | "organization";

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
  | Endpoint<"POST", "/profiles/:username/relationships/follow", void>
  | Endpoint<"POST", "/profiles/:username/relationships/unfollow", void>;
