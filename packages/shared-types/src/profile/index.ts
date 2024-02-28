export interface Profile {
  type: "user" | "organization";

  displayName: string;
  description: string;

  profilePictureUrl?: string;
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
