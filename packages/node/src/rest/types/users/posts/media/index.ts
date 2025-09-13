import { Endpoint } from "../../../../endpoints";

export enum UserPostMediaType {
  Image = "image",
  Video = "video",
}

export type UserPostMedia = {
  url: string;
  type: UserPostMediaType;
  width: number;
  height: number;
  description?: string;
  isNSFW: boolean;
  thumbnailUrl?: string;
  duration?: number;
};

export type UserPostMediaEndpoints = Endpoint<
  "POST",
  "/users/@me/posts/media",
  string,
  FormData
>;
