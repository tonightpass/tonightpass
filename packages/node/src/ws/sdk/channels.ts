import { ChannelWebSocketClient } from "../client/channels";
import { WebSocketClientOptions } from "../types";

export function channelsWS(options?: Partial<WebSocketClientOptions>) {
  const client = new ChannelWebSocketClient(options);

  return {
    connect: (channelId: string, token?: string) =>
      client.connectToChannel(channelId, { token }),

    connectToOrganization: (
      organizationSlug: string,
      channelId: string,
      token?: string,
    ) =>
      client.connectToOrganizationChannel(organizationSlug, channelId, {
        token,
      }),

    connectToUserChannels: (token?: string) =>
      client.connectToUserChannels({ token }),

    connectToOrganizationChannels: (organizationSlug: string, token?: string) =>
      client.connectToOrganizationChannels(organizationSlug, { token }),

    onMessageCreate: (handler: Parameters<typeof client.onMessageCreate>[0]) =>
      client.onMessageCreate(handler),

    onMessageUpdate: (handler: Parameters<typeof client.onMessageUpdate>[0]) =>
      client.onMessageUpdate(handler),

    onMessageDelete: (handler: Parameters<typeof client.onMessageDelete>[0]) =>
      client.onMessageDelete(handler),

    onChannelUpdate: (handler: Parameters<typeof client.onChannelUpdate>[0]) =>
      client.onChannelUpdate(handler),

    onChannelDelete: (handler: Parameters<typeof client.onChannelDelete>[0]) =>
      client.onChannelDelete(handler),

    onMemberJoin: (handler: Parameters<typeof client.onMemberJoin>[0]) =>
      client.onMemberJoin(handler),

    onMemberLeave: (handler: Parameters<typeof client.onMemberLeave>[0]) =>
      client.onMemberLeave(handler),

    onTypingStart: (handler: Parameters<typeof client.onTypingStart>[0]) =>
      client.onTypingStart(handler),

    onTypingStop: (handler: Parameters<typeof client.onTypingStop>[0]) =>
      client.onTypingStop(handler),

    onAny: (handler: Parameters<typeof client.on>[1]) =>
      client.on("*", handler),

    startTyping: (channelId: string) => client.startTyping(channelId),
    stopTyping: (channelId: string) => client.stopTyping(channelId),

    subscribeToChannel: (channelId: string) =>
      client.subscribeToChannel(channelId),
    unsubscribeFromChannel: (channelId: string) =>
      client.unsubscribeFromChannel(channelId),

    disconnect: () => client.disconnect(),

    get connected() {
      return client.connected;
    },

    get reconnecting() {
      return client.reconnecting;
    },

    client,
  };
}
