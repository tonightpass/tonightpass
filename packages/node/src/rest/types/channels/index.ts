import { Base, Profile, ArrayResult, ArrayOptions } from "..";
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

export type UserChannelCountOptions = {
  unseen?: boolean;
};

export type ChannelEndpoints =
  | Endpoint<
      "GET",
      "/channels/@me",
      ArrayResult<Channel>,
      ArrayOptions<Channel>
    >
  | Endpoint<
      "GET",
      "/channels/:organizationSlug",
      ArrayResult<Channel>,
      ArrayOptions<Channel>
    >
  | Endpoint<
      "GET",
      "/users/@me/channels/count",
      number,
      UserChannelCountOptions
    >
  | Endpoint<
      "GET",
      "/users/:organizationSlug/channels/count",
      number,
      UserChannelCountOptions
    >
  | Endpoint<"GET", "/channels/@me/:channelId", Channel>
  | Endpoint<"GET", "/channels/:organizationSlug/:channelId", Channel>
  | Endpoint<"POST", "/channels/@me", Channel, CreateChannelDto>
  | Endpoint<"POST", "/channels/:organizationSlug", Channel, CreateChannelDto>
  | Endpoint<"PUT", "/channels/@me/:channelId", Channel, UpdateChannelDto>
  | Endpoint<
      "PUT",
      "/channels/:organizationSlug/:channelId",
      Channel,
      UpdateChannelDto
    >
  | Endpoint<"DELETE", "/channels/@me/:channelId", void>
  | Endpoint<"DELETE", "/channels/:organizationSlug/:channelId", void>
  | Endpoint<
      "POST",
      "/channels/@me/:channelId/participants",
      void,
      AddParticipantDto
    >
  | Endpoint<
      "POST",
      "/channels/:organizationSlug/:channelId/participants",
      void,
      AddParticipantDto
    >
  | Endpoint<"DELETE", "/channels/@me/:channelId/participants/:username", void>
  | Endpoint<
      "DELETE",
      "/channels/:organizationSlug/:channelId/participants/:username",
      void
    >
  | Endpoint<
      "GET",
      "/channels/@me/:channelId/members",
      ArrayResult<ChannelMember>,
      ArrayOptions<ChannelMember>
    >
  | Endpoint<
      "GET",
      "/channels/:organizationSlug/:channelId/members",
      ArrayResult<ChannelMember>,
      ArrayOptions<ChannelMember>
    >;
