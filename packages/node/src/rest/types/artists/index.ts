import type { Endpoint } from "../../endpoints";
import type { ArrayOptions, ArrayResult, OrganizationEvent } from "..";

export type ArtistSoundcloudBadges = {
  pro: boolean;
  proUnlimited: boolean;
  verified: boolean;
};

export type ArtistSoundcloudWebProfile = {
  network: string;
  url: string;
  title?: string;
  username?: string;
};

export type ArtistTrack = {
  id: string;
  title: string;
  permalinkUrl: string;
  artworkUrl?: string;
  duration: number;
  playbackCount: number;
  likesCount: number;
  genre?: string;
  createdAt: string;
};

export type ArtistSoundcloudData = {
  permalinkUrl: string;
  followersCount: number;
  followingsCount: number;
  trackCount: number;
  playlistCount: number;
  likesCount: number;
  badges: ArtistSoundcloudBadges;
  webProfiles: ArtistSoundcloudWebProfile[];
};

export type ArtistTonightPassData = {
  followersCount: number;
  isFollowing: boolean;
};

export type Artist = {
  id: string;
  username: string;
  permalink: string;
  fullName?: string;
  city?: string;
  countryCode?: string;
  description?: string;
  avatarUrl: string;
  bannerUrl?: string;
  soundcloud: ArtistSoundcloudData;
  tonightpass: ArtistTonightPassData;
};

export type ArtistWithTracks = Omit<Artist, "soundcloud"> & {
  soundcloud: ArtistSoundcloudData & {
    tracks: ArtistTrack[];
    topTracks: ArtistTrack[];
  };
};

export type EventArtistRef = {
  id: string;
  permalink: string;
  username: string;
};

export type SearchArtistsOptions = ArrayOptions<Artist> & {
  q: string;
};

export type GetArtistOptions = {
  trackLimit?: number;
};

export type ListArtistEventsOptions = ArrayOptions<OrganizationEvent> & {
  upcoming?: boolean;
};

export type ListTopArtistsOptions = ArrayOptions<Artist>;

export type ArtistEndpoints =
  | Endpoint<"GET", "/artists/top", ArrayResult<Artist>, ListTopArtistsOptions>
  | Endpoint<
      "GET",
      "/artists/search",
      ArrayResult<Artist>,
      SearchArtistsOptions
    >
  | Endpoint<
      "GET",
      "/artists/:idOrPermalink",
      ArtistWithTracks,
      GetArtistOptions
    >
  | Endpoint<"POST", "/artists/:idOrPermalink/follow", { isFollowing: boolean }>
  | Endpoint<
      "DELETE",
      "/artists/:idOrPermalink/follow",
      { isFollowing: boolean }
    >
  | Endpoint<
      "GET",
      "/artists/:idOrPermalink/events",
      ArrayResult<OrganizationEvent>,
      ListArtistEventsOptions
    >;
