import { Channel, ChannelParticipant } from "..";
import { Base, ArrayResult, ArrayOptions } from "../..";
import {
  CreateChannelMessageDto,
  UpdateChannelMessageDto,
  AddReactionDto,
} from "../../../dtos";
import { Endpoint } from "../../../endpoints";

export enum AttachmentType {
  Image = "image",
  Video = "video",
  Audio = "audio",
  Document = "document",
  File = "file",
}

export type Attachment = {
  type: AttachmentType;
  url: string;
  filename?: string;
  size?: number;
  mimeType?: string;
};

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
  content: string;
  attachments: Attachment[];
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
      "/channels/@me/:channelId/messages",
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
      "/channels/@me/:channelId/messages/:messageId",
      ChannelMessage
    >
  | Endpoint<
      "GET",
      "/channels/:organizationSlug/:channelId/messages/:messageId",
      ChannelMessage
    >
  | Endpoint<
      "POST",
      "/channels/@me/:channelId/messages",
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
      "/channels/@me/:channelId/messages/:messageId",
      ChannelMessage,
      UpdateChannelMessageDto
    >
  | Endpoint<
      "PUT",
      "/channels/:organizationSlug/:channelId/messages/:messageId",
      ChannelMessage,
      UpdateChannelMessageDto
    >
  | Endpoint<"DELETE", "/channels/@me/:channelId/messages/:messageId", void>
  | Endpoint<
      "DELETE",
      "/channels/:organizationSlug/:channelId/messages/:messageId",
      void
    >
  | Endpoint<
      "POST",
      "/channels/@me/:channelId/messages/:messageId/reactions",
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
      "/channels/@me/:channelId/messages/:messageId/reactions/:emoji",
      void
    >
  | Endpoint<
      "DELETE",
      "/channels/:organizationSlug/:channelId/messages/:messageId/reactions/:emoji",
      void
    >
  | Endpoint<
      "POST",
      "/channels/@me/:channelId/messages/:messageId/read",
      void,
      null
    >
  | Endpoint<
      "POST",
      "/channels/:organizationSlug/:channelId/messages/:messageId/read",
      void,
      null
    >;
