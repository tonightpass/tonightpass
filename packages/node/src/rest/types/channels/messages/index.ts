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

export type ChannelMessage = Base & {
  channel: Channel;
  sender: ChannelParticipant;
  content: string;
  attachments: Attachment[];
  sent: boolean;
  delivered: boolean;
  read: boolean;
  readBy?: { participant: ChannelParticipant; readAt: Date }[];
  edited: boolean;
  editedAt?: Date;
  replyTo?: ChannelMessage;
  reactions?: { emoji: string; participants: ChannelParticipant[] }[];
};

export type ChannelMessageEndpoints =
  | Endpoint<
      "GET",
      "/channels/:channelId/messages",
      ArrayResult<ChannelMessage>,
      ArrayOptions<ChannelMessage>
    >
  | Endpoint<"GET", "/channels/:channelId/messages/:messageId", ChannelMessage>
  | Endpoint<
      "POST",
      "/channels/:channelId/messages",
      ChannelMessage,
      CreateChannelMessageDto
    >
  | Endpoint<
      "PUT",
      "/channels/:channelId/messages/:messageId",
      ChannelMessage,
      UpdateChannelMessageDto
    >
  | Endpoint<
      "DELETE",
      "/channels/:channelId/messages/:messageId",
      void,
      undefined
    >
  | Endpoint<
      "POST",
      "/channels/:channelId/messages/:messageId/reactions",
      void,
      AddReactionDto
    >
  | Endpoint<
      "DELETE",
      "/channels/:channelId/messages/:messageId/reactions/:emoji",
      void,
      undefined
    >
  | Endpoint<
      "POST",
      "/channels/:channelId/messages/:messageId/read",
      void,
      null
    >;
