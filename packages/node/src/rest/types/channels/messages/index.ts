import { Channel, ChannelParticipant } from "..";
import { Base, ArrayResult, ArrayOptions } from "../..";
import {
  CreateChannelMessageDto,
  UpdateChannelMessageDto,
  AddReactionDto,
  ReportChannelMessageDto,
} from "../../../dtos";
import { Endpoint } from "../../../endpoints";

export enum ChannelMessageReportReason {
  Dislike = "dislike",

  HarassmentSelf = "harassment_self",
  HarassmentOther = "harassment_other",
  SexualHarassmentSelf = "sexual_harassment_self",

  NudesSelf = "nudes_self",
  SexualContent = "sexual_content",
  ChildInvolved = "child_involved",

  ThreatTarget = "threat_target",
  ViolentContent = "violent_content",

  HateSpeech = "hate_speech",
  Terrorism = "terrorism",

  DrugSale = "drug_sale",
  WeaponSale = "weapon_sale",

  SelfHarmConcern = "self_harm_concern",
  SelfHarmPromotion = "self_harm_promotion",

  Other = "other",
}

export type ChannelMessageReadByEntry = {
  participant: ChannelParticipant;
  readAt: Date;
};

export type ChannelMessageReaction = {
  emoji: string;
  participants: ChannelParticipant[];
};

export type ChannelMessage = Base & {
  channel: Channel;
  sender: ChannelParticipant;
  content?: string;
  attachments: string[];
  isSent: boolean;
  isDelivered: boolean;
  isRead: boolean;
  readBy?: ChannelMessageReadByEntry[];
  isEdited: boolean;
  editedAt?: Date;
  replyTo?: ChannelMessage;
  reactions?: ChannelMessageReaction[];
};

export type ChannelMessageEndpoints =
  | Endpoint<
      "GET",
      "/channels/~me/:channelId/messages",
      ArrayResult<ChannelMessage>,
      ArrayOptions<ChannelMessage>
    >
  | Endpoint<
      "GET",
      "/channels/:organizationSlug/:channelId/messages",
      ArrayResult<ChannelMessage>,
      ArrayOptions<ChannelMessage>
    >
  | Endpoint<
      "GET",
      "/channels/~me/:channelId/messages/:messageId",
      ChannelMessage
    >
  | Endpoint<
      "GET",
      "/channels/:organizationSlug/:channelId/messages/:messageId",
      ChannelMessage
    >
  | Endpoint<
      "POST",
      "/channels/~me/:channelId/messages",
      ChannelMessage,
      CreateChannelMessageDto
    >
  | Endpoint<
      "POST",
      "/channels/:organizationSlug/:channelId/messages",
      ChannelMessage,
      CreateChannelMessageDto
    >
  | Endpoint<
      "PUT",
      "/channels/~me/:channelId/messages/:messageId",
      ChannelMessage,
      UpdateChannelMessageDto
    >
  | Endpoint<
      "PUT",
      "/channels/:organizationSlug/:channelId/messages/:messageId",
      ChannelMessage,
      UpdateChannelMessageDto
    >
  | Endpoint<
      "DELETE",
      "/channels/~me/:channelId/messages/:messageId",
      void,
      undefined
    >
  | Endpoint<
      "DELETE",
      "/channels/:organizationSlug/:channelId/messages/:messageId",
      void,
      undefined
    >
  | Endpoint<
      "POST",
      "/channels/~me/:channelId/messages/:messageId/reactions",
      void,
      AddReactionDto
    >
  | Endpoint<
      "POST",
      "/channels/:organizationSlug/:channelId/messages/:messageId/reactions",
      void,
      AddReactionDto
    >
  | Endpoint<
      "DELETE",
      "/channels/~me/:channelId/messages/:messageId/reactions/:emoji",
      void,
      undefined
    >
  | Endpoint<
      "DELETE",
      "/channels/:organizationSlug/:channelId/messages/:messageId/reactions/:emoji",
      void,
      undefined
    >
  | Endpoint<
      "POST",
      "/channels/~me/:channelId/messages/:messageId/read",
      void,
      undefined
    >
  | Endpoint<
      "POST",
      "/channels/:organizationSlug/:channelId/messages/:messageId/read",
      void,
      undefined
    >
  | Endpoint<"POST", "/channels/~me/:channelId/files", string, FormData>
  | Endpoint<
      "POST",
      "/channels/:organizationSlug/:channelId/files",
      string,
      FormData
    >
  | Endpoint<
      "POST",
      "/channels/~me/:channelId/messages/:messageId/report",
      void,
      ReportChannelMessageDto
    >
  | Endpoint<
      "POST",
      "/channels/:organizationSlug/:channelId/messages/:messageId/report",
      void,
      ReportChannelMessageDto
    >;
