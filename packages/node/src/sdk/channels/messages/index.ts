import {
  CreateChannelMessageDto,
  UpdateChannelMessageDto,
  ArrayOptions,
  ChannelMessage,
} from "../../../rest";
import { sdk } from "../../builder";

export const channelsMessages = sdk((client) => ({
  getAll: async (channelId: string, options?: ArrayOptions<ChannelMessage>) =>
    client.get("/channels/:channelId/messages", {
      channelId,
      ...options,
    }),
  get: async (channelId: string, messageId: string) =>
    client.get("/channels/:channelId/messages/:messageId", {
      channelId,
      messageId,
    }),
  create: async (channelId: string, data: CreateChannelMessageDto) =>
    client.post("/channels/:channelId/messages", data, { channelId }),
  update: async (
    channelId: string,
    messageId: string,
    data: UpdateChannelMessageDto,
  ) =>
    client.put("/channels/:channelId/messages/:messageId", data, {
      channelId,
      messageId,
    }),
  delete: async (channelId: string, messageId: string) =>
    client.delete("/channels/:channelId/messages/:messageId", undefined, {
      channelId,
      messageId,
    }),
  addReaction: async (channelId: string, messageId: string, emoji: string) =>
    client.post(
      "/channels/:channelId/messages/:messageId/reactions",
      { emoji },
      { channelId, messageId },
    ),
  removeReaction: async (channelId: string, messageId: string, emoji: string) =>
    client.delete(
      "/channels/:channelId/messages/:messageId/reactions/:emoji",
      undefined,
      {
        channelId,
        messageId,
        emoji,
      },
    ),
  markAsRead: async (channelId: string, messageId: string) =>
    client.post("/channels/:channelId/messages/:messageId/read", null, {
      channelId,
      messageId,
    }),
}));
