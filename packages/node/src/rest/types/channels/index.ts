import { Base, Profile } from "..";
import {
  CreateChannelDto,
  UpdateChannelDto,
  AddParticipantDto,
} from "../../dtos";
import { Endpoint } from "../../endpoints";

export * from "./messages";

export enum ChannelType {
  Private = "private",
  Group = "group",
}

export type ChannelParticipant = Profile;

export type Channel = Base & {
  type: ChannelType;
  participants: ChannelParticipant[];
  name?: string;
  lastMessageAt?: Date;
  unreadCount?: number;
};

export type ChannelMember = {
  participant: ChannelParticipant;
  joinedAt: Date;
  role?: "admin" | "member";
  lastReadAt?: Date;
};

export type ChannelEndpoints =
  | Endpoint<"GET", "/channels", Channel[]>
  | Endpoint<"GET", "/channels/:channelId", Channel>
  | Endpoint<"POST", "/channels", Channel, CreateChannelDto>
  | Endpoint<"PUT", "/channels/:channelId", Channel, UpdateChannelDto>
  | Endpoint<"DELETE", "/channels/:channelId", void, undefined>
  | Endpoint<
      "POST",
      "/channels/:channelId/participants",
      void,
      AddParticipantDto
    >
  | Endpoint<
      "DELETE",
      "/channels/:channelId/participants/:username",
      void,
      undefined
    >
  | Endpoint<"GET", "/channels/:channelId/members", ChannelMember[]>;
