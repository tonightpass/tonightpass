import { CreateChannelDto, UpdateChannelDto } from "../../rest";
import { sdk } from "../builder";
import { channelsMessages } from "./messages";

export const channels = sdk((client) => ({
  getAll: async () => client.get("/channels"),
  get: async (channelId: string) =>
    client.get("/channels/:channelId", { channelId }),
  create: async (data: CreateChannelDto) => client.post("/channels", data),
  update: async (channelId: string, data: UpdateChannelDto) =>
    client.put("/channels/:channelId", data, { channelId }),
  delete: async (channelId: string) =>
    client.delete("/channels/:channelId", undefined, { channelId }),
  addParticipant: async (channelId: string, username: string) =>
    client.post(
      "/channels/:channelId/participants",
      { username },
      { channelId },
    ),
  removeParticipant: async (channelId: string, username: string) =>
    client.delete("/channels/:channelId/participants/:username", undefined, {
      channelId,
      username,
    }),
  getMembers: async (channelId: string) =>
    client.get("/channels/:channelId/members", { channelId }),
  messages: channelsMessages(client),
}));
