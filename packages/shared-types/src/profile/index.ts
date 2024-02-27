export interface Profile {
  type: "user" | "organization";

  name: string;
  username: string;
  description: string;
  verified: boolean;

  profilePictureUrl?: string;
  bannerUrl?: string;

  followers: number;
  following: number;
  views: number;
  events: number;

  createdAt: string;
  updatedAt: string;
}
