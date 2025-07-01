import {
  CreateChannelDto,
  UpdateChannelDto,
  ArrayOptions,
  Channel,
  ChannelMember,
  AddParticipantDto,
  UserChannelCountOptions,
} from "../../rest";
import { sdk } from "../builder";
import { channelsMessages } from "./messages";

export const channels = sdk((client) => ({
  me: async (options?: ArrayOptions<Channel>) =>
    client.get("/channels/@me", options),
  getByOrganization: async (
    organizationSlug: string,
    options?: ArrayOptions<Channel>,
  ) =>
    client.get("/channels/:organizationSlug", { organizationSlug, ...options }),
  countMe: async (options?: UserChannelCountOptions) =>
    client.get("/users/@me/channels/count", options),
  countByOrganization: async (
    organizationSlug: string,
    options?: UserChannelCountOptions,
  ) =>
    client.get("/users/:organizationSlug/channels/count", {
      organizationSlug,
      ...options,
    }),
  get: async (channelId: string) =>
    client.get("/channels/@me/:channelId", { channelId }),
  getByOrganizationChannel: async (
    organizationSlug: string,
    channelId: string,
  ) =>
    client.get("/channels/:organizationSlug/:channelId", {
      organizationSlug,
      channelId,
    }),
  create: async (data: CreateChannelDto) => client.post("/channels/@me", data),
  createByOrganization: async (
    organizationSlug: string,
    data: CreateChannelDto,
  ) => client.post("/channels/:organizationSlug", data, { organizationSlug }),
  update: async (channelId: string, data: UpdateChannelDto) =>
    client.put("/channels/@me/:channelId", data, { channelId }),
  updateByOrganization: async (
    organizationSlug: string,
    channelId: string,
    data: UpdateChannelDto,
  ) =>
    client.put("/channels/:organizationSlug/:channelId", data, {
      organizationSlug,
      channelId,
    }),
  delete: async (channelId: string) =>
    client.delete("/channels/@me/:channelId", undefined, { channelId }),
  deleteByOrganization: async (organizationSlug: string, channelId: string) =>
    client.delete("/channels/:organizationSlug/:channelId", undefined, {
      organizationSlug,
      channelId,
    }),
  addParticipant: async (channelId: string, data: AddParticipantDto) =>
    client.post("/channels/@me/:channelId/participants", data, { channelId }),
  addParticipantByOrganization: async (
    organizationSlug: string,
    channelId: string,
    data: AddParticipantDto,
  ) =>
    client.post("/channels/:organizationSlug/:channelId/participants", data, {
      organizationSlug,
      channelId,
    }),
  removeParticipant: async (channelId: string, username: string) =>
    client.delete(
      "/channels/@me/:channelId/participants/:username",
      undefined,
      {
        channelId,
        username,
      },
    ),
  removeParticipantByOrganization: async (
    organizationSlug: string,
    channelId: string,
    username: string,
  ) =>
    client.delete(
      "/channels/:organizationSlug/:channelId/participants/:username",
      undefined,
      {
        organizationSlug,
        channelId,
        username,
      },
    ),
  getMembers: async (
    channelId: string,
    options?: ArrayOptions<ChannelMember>,
  ) =>
    client.get("/channels/@me/:channelId/members", { channelId, ...options }),
  getMembersByOrganization: async (
    organizationSlug: string,
    channelId: string,
    options?: ArrayOptions<ChannelMember>,
  ) =>
    client.get("/channels/:organizationSlug/:channelId/members", {
      organizationSlug,
      channelId,
      ...options,
    }),
  messages: channelsMessages(client),
}));
