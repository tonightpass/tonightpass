import { Endpoint } from "../../endpoints";
import { OrganizationIdentity } from "../organizations";
import { UserIdentity } from "../users";

export enum ProfileType {
  User = "user",
  Organization = "organization",
}

export type BaseProfile = {
  type: ProfileType;

  displayName: string;
  description?: string;

  avatarUrl?: string;
  bannerUrl?: string;

  metadata: ProfileMetadata;

  createdAt: Date;
};

export type UserProfile = BaseProfile & {
  type: ProfileType.User;
  metadata: UserProfileMetadata;
};

export type OrganizationProfile = BaseProfile & {
  type: ProfileType.Organization;
  metadata: OrganizationProfileMetadata;
};

export type Profile = UserProfile | OrganizationProfile;

export type BaseProfileMetadata = {
  followersCount: number;

  isFollower: boolean;
  isFollowing: boolean;

  isBlocked: boolean;
  hasBlocked: boolean;
  canDM: boolean;
};

export type UserProfileMetadata = BaseProfileMetadata & {
  hasPassPlus: boolean;
  idValid: boolean;
};

export type OrganizationProfileMetadata = BaseProfileMetadata & {
  eventsCount: number;
  viewsCount: number;
  membersCount: number;
};

export type ProfileMetadata = UserProfileMetadata | OrganizationProfileMetadata;

export type ProfileEndpoints =
  | Endpoint<"GET", "/profiles/:username", UserIdentity | OrganizationIdentity>
  | Endpoint<"POST", "/profiles/:username/relationships/follow", void, null>
  | Endpoint<"POST", "/profiles/:username/relationships/unfollow", void, null>;
