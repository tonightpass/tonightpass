import { Endpoint } from "../../endpoints";
import { UserIdentity } from "../users";

export interface Profile {
  type: "user" | "organization";

  displayName: string;
  description: string;

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

export type ProfileEndpoints = Endpoint<
  "GET",
  "/profiles/:username",
  UserIdentity
>;
