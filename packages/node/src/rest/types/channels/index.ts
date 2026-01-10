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

export enum ChannelMemberRole {
  Member = "member",
  Admin = "admin",
}

export type ChannelParticipant = Profile;

export enum ChannelStatus {
  Sent = "sent",
  Delivered = "delivered",
  Read = "read",
  Received = "received",
  Opened = "opened",
}

export type Channel = Base & {
  type: ChannelType;
  participants: ChannelParticipant[];
  name?: string;
  lastMessageAt?: Date;
  status?: ChannelStatus;
  unreadCount?: number;
};

export type ChannelMember = {
  participant: ChannelParticipant;
  joinedAt: Date;
  role?: ChannelMemberRole;
  lastReadAt?: Date;
};

export type UserChannelCountOptions = {
  unseen?: boolean;
};

export type ChannelEndpoints =
  | Endpoint<
      "GET",
      "/channels/~me",
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
      "/users/~me/channels/count",
      number,
      UserChannelCountOptions
    >
  | Endpoint<
      "GET",
      "/users/@:organizationSlug/channels/count",
      number,
      UserChannelCountOptions
    >
  | Endpoint<"GET", "/channels/~me/:channelId", Channel>
  | Endpoint<"GET", "/channels/:organizationSlug/:channelId", Channel>
  | Endpoint<"POST", "/channels/~me", Channel, CreateChannelDto>
  | Endpoint<"POST", "/channels/:organizationSlug", Channel, CreateChannelDto>
  | Endpoint<"PUT", "/channels/~me/:channelId", Channel, UpdateChannelDto>
  | Endpoint<
      "PUT",
      "/channels/:organizationSlug/:channelId",
      Channel,
      UpdateChannelDto
    >
  | Endpoint<"DELETE", "/channels/~me/:channelId", void, undefined>
  | Endpoint<
      "DELETE",
      "/channels/:organizationSlug/:channelId",
      void,
      undefined
    >
  | Endpoint<
      "POST",
      "/channels/~me/:channelId/participants",
      void,
      AddParticipantDto
    >
  | Endpoint<
      "POST",
      "/channels/:organizationSlug/:channelId/participants",
      void,
      AddParticipantDto
    >
  | Endpoint<
      "DELETE",
      "/channels/~me/:channelId/participants/:username",
      void,
      undefined
    >
  | Endpoint<
      "DELETE",
      "/channels/:organizationSlug/:channelId/participants/:username",
      void,
      undefined
    >
  | Endpoint<
      "GET",
      "/channels/~me/:channelId/members",
      ArrayResult<ChannelMember>,
      ArrayOptions<ChannelMember>
    >
  | Endpoint<
      "GET",
      "/channels/:organizationSlug/:channelId/members",
      ArrayResult<ChannelMember>,
      ArrayOptions<ChannelMember>
    >;
