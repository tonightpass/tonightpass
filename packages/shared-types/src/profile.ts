export interface Profile {
  type: "user" | "organization";
  displayName: string;
  description: string;
  profilePictureUrl?: string;
  bannerUrl?: string;
}
