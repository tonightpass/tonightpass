import {
  CreateChannelMessageDto,
  UpdateChannelMessageDto,
  ArrayOptions,
  ChannelMessage,
  AddReactionDto,
  ReportChannelMessageDto,
} from "../../../rest";
import { sdk } from "../../builder";

export const channelsMessages = sdk((client) => ({
  getAll: async (channelId: string, options?: ArrayOptions<ChannelMessage>) =>
    client.get("/channels/~me/:channelId/messages", {
      channelId,
      ...options,
    }),
  getAllByOrganization: async (
    organizationSlug: string,
    channelId: string,
    options?: ArrayOptions<ChannelMessage>,
  ) =>
    client.get("/channels/:organizationSlug/:channelId/messages", {
      organizationSlug,
      channelId,
      ...options,
    }),
  get: async (channelId: string, messageId: string) =>
    client.get("/channels/~me/:channelId/messages/:messageId", {
      channelId,
      messageId,
    }),
  getByOrganization: async (
    organizationSlug: string,
    channelId: string,
    messageId: string,
  ) =>
    client.get("/channels/:organizationSlug/:channelId/messages/:messageId", {
      organizationSlug,
      channelId,
      messageId,
    }),
  create: async (channelId: string, data: CreateChannelMessageDto) =>
    client.post("/channels/~me/:channelId/messages", data, { channelId }),
  createByOrganization: async (
    organizationSlug: string,
    channelId: string,
    data: CreateChannelMessageDto,
  ) =>
    client.post("/channels/:organizationSlug/:channelId/messages", data, {
      organizationSlug,
      channelId,
    }),
  update: async (
    channelId: string,
    messageId: string,
    data: UpdateChannelMessageDto,
  ) =>
    client.put("/channels/~me/:channelId/messages/:messageId", data, {
      channelId,
      messageId,
    }),
  updateByOrganization: async (
    organizationSlug: string,
    channelId: string,
    messageId: string,
    data: UpdateChannelMessageDto,
  ) =>
    client.put(
      "/channels/:organizationSlug/:channelId/messages/:messageId",
      data,
      {
        organizationSlug,
        channelId,
        messageId,
      },
    ),
  delete: async (channelId: string, messageId: string) =>
    client.delete("/channels/~me/:channelId/messages/:messageId", undefined, {
      channelId,
      messageId,
    }),
  deleteByOrganization: async (
    organizationSlug: string,
    channelId: string,
    messageId: string,
  ) =>
    client.delete(
      "/channels/:organizationSlug/:channelId/messages/:messageId",
      undefined,
      {
        organizationSlug,
        channelId,
        messageId,
      },
    ),
  addReaction: async (
    channelId: string,
    messageId: string,
    data: AddReactionDto,
  ) =>
    client.post(
      "/channels/~me/:channelId/messages/:messageId/reactions",
      data,
      { channelId, messageId },
    ),
  addReactionByOrganization: async (
    organizationSlug: string,
    channelId: string,
    messageId: string,
    data: AddReactionDto,
  ) =>
    client.post(
      "/channels/:organizationSlug/:channelId/messages/:messageId/reactions",
      data,
      { organizationSlug, channelId, messageId },
    ),
  removeReaction: async (channelId: string, messageId: string, emoji: string) =>
    client.delete(
      "/channels/~me/:channelId/messages/:messageId/reactions/:emoji",
      undefined,
      {
        channelId,
        messageId,
        emoji,
      },
    ),
  removeReactionByOrganization: async (
    organizationSlug: string,
    channelId: string,
    messageId: string,
    emoji: string,
  ) =>
    client.delete(
      "/channels/:organizationSlug/:channelId/messages/:messageId/reactions/:emoji",
      undefined,
      {
        organizationSlug,
        channelId,
        messageId,
        emoji,
      },
    ),
  markAsRead: async (channelId: string, messageId: string) =>
    client.post("/channels/~me/:channelId/messages/:messageId/read", undefined, {
      channelId,
      messageId,
    }),
  markAsReadByOrganization: async (
    organizationSlug: string,
    channelId: string,
    messageId: string,
  ) =>
    client.post(
      "/channels/:organizationSlug/:channelId/messages/:messageId/read",
      undefined,
      {
        organizationSlug,
        channelId,
        messageId,
      },
    ),
  uploadFile: async (channelId: string, file: FormData) =>
    client.post("/channels/~me/:channelId/files", file, { channelId }),
  uploadFileByOrganization: async (
    organizationSlug: string,
    channelId: string,
    file: FormData,
  ) =>
    client.post("/channels/:organizationSlug/:channelId/files", file, {
      organizationSlug,
      channelId,
    }),
  report: async (
    channelId: string,
    messageId: string,
    data: ReportChannelMessageDto,
  ) =>
    client.post("/channels/~me/:channelId/messages/:messageId/report", data, {
      channelId,
      messageId,
    }),
  reportByOrganization: async (
    organizationSlug: string,
    channelId: string,
    messageId: string,
    data: ReportChannelMessageDto,
  ) =>
    client.post(
      "/channels/:organizationSlug/:channelId/messages/:messageId/report",
      data,
      { organizationSlug, channelId, messageId },
    ),
}));
