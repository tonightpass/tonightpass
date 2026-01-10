import { ArrayOptions, ArrayResult } from "..";
import { Endpoint } from "../../endpoints";

export enum ProfileType {
  User = "user",
  Organization = "organization",
}

export type BaseProfile = {
  type: ProfileType;
  slug: string;

  displayName: string;
  description?: string;

  avatarUrl?: string;
  bannerUrl?: string;

  links: string[];

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

  isOfficial: boolean;
};

export type UserProfileMetadata = BaseProfileMetadata & {
  hasPassPlus: boolean;
};

export type OrganizationProfileMetadata = BaseProfileMetadata & {
  eventsCount: number;
  viewsCount: number;
  membersCount: number;
};

export type ProfileMetadata = UserProfileMetadata | OrganizationProfileMetadata;

export type SearchProfilesOptions = ArrayOptions<Profile> & {
  q: string;
};

export type ProfileEndpoints =
  | Endpoint<"GET", "/profiles", ArrayResult<Profile>, ArrayOptions<Profile>>
  | Endpoint<
      "GET",
      "/profiles/search",
      ArrayResult<Profile>,
      SearchProfilesOptions
    >
  | Endpoint<"GET", "/profiles/@:username", Profile>
  | Endpoint<
      "GET",
      "/profiles/~me/relationships/suggestions",
      ArrayResult<Profile>,
      ArrayOptions<OrganizationProfile | UserProfile>
    >
  | Endpoint<
      "GET",
      "/profiles/@:username/relationships/followers",
      ArrayResult<UserProfile>,
      ArrayOptions<UserProfile>
    >
  | Endpoint<"POST", "/profiles/@:username/relationships/follow", boolean, undefined>
  | Endpoint<
      "POST",
      "/profiles/@:username/relationships/unfollow",
      boolean,
      undefined
    >;
