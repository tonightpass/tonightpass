import { Base, User } from "..";
import { CreateChannelDto, UpdateChannelDto } from "../../dtos";
import { Endpoint } from "../../endpoints";

export * from "./messages";

export enum ChannelType {
  Private = "private",
  Group = "group",
}

export type Channel = Base & {
  type: ChannelType;
  users: User[];
  name?: string; // Optional name for group channels
  description?: string; // Optional description for group channels
  lastMessageAt?: Date; // Last message timestamp
  unreadCount?: number; // Unread messages count per user
};

export type ChannelMember = {
  user: User;
  joinedAt: Date;
  role?: "admin" | "member"; // For group channels
  lastReadAt?: Date; // Last read message timestamp
};

export type ChannelEndpoints =
  | Endpoint<"GET", "/channels", Channel[]>
  | Endpoint<"GET", "/channels/:channelId", Channel>
  | Endpoint<"POST", "/channels", Channel, CreateChannelDto>
  | Endpoint<"PUT", "/channels/:channelId", Channel, UpdateChannelDto>
  | Endpoint<"DELETE", "/channels/:channelId", void, undefined>
  | Endpoint<"POST", "/channels/:channelId/members/:userId", void, null>
  | Endpoint<"DELETE", "/channels/:channelId/members/:userId", void, undefined>
  | Endpoint<"GET", "/channels/:channelId/members", ChannelMember[]>;
