import type {
  ChannelDeleteEvent,
  ChannelMemberJoinEvent,
  ChannelMemberLeaveEvent,
  ChannelMessageCreateEvent,
  ChannelMessageDeleteEvent,
  ChannelMessageUpdateEvent,
  ChannelUpdateEvent,
  TypingStartEvent,
  TypingStopEvent,
  WebSocketConnectOptions,
} from "../types";
import { WebSocketClient, type WebSocketEventHandler } from "./index";

export class ChannelWebSocketClient extends WebSocketClient {
  async connectToChannel(
    channelId: string,
    options: WebSocketConnectOptions = {}
  ) {
    return this.connect("/channels/~me/:channelId/ws", {
      ...options,
      channelId,
    });
  }

  async connectToOrganizationChannel(
    organizationSlug: string,
    channelId: string,
    options: WebSocketConnectOptions = {}
  ) {
    return this.connect("/channels/:organizationSlug/:channelId/ws", {
      ...options,
      organizationSlug,
      channelId,
    });
  }

  async connectToUserChannels(options: WebSocketConnectOptions = {}) {
    return this.connect("/channels/~me/ws", options);
  }

  async connectToOrganizationChannels(
    organizationSlug: string,
    options: WebSocketConnectOptions = {}
  ) {
    return this.connect("/channels/:organizationSlug/ws", {
      ...options,
      organizationSlug,
    });
  }

  // Event handler methods for better type safety
  onMessageCreate(handler: WebSocketEventHandler<ChannelMessageCreateEvent>) {
    return this.on("channel_message_create", handler);
  }

  onMessageUpdate(handler: WebSocketEventHandler<ChannelMessageUpdateEvent>) {
    return this.on("channel_message_update", handler);
  }

  onMessageDelete(handler: WebSocketEventHandler<ChannelMessageDeleteEvent>) {
    return this.on("channel_message_delete", handler);
  }

  onChannelUpdate(handler: WebSocketEventHandler<ChannelUpdateEvent>) {
    return this.on("channel_update", handler);
  }

  onChannelDelete(handler: WebSocketEventHandler<ChannelDeleteEvent>) {
    return this.on("channel_delete", handler);
  }

  onMemberJoin(handler: WebSocketEventHandler<ChannelMemberJoinEvent>) {
    return this.on("channel_member_join", handler);
  }

  onMemberLeave(handler: WebSocketEventHandler<ChannelMemberLeaveEvent>) {
    return this.on("channel_member_leave", handler);
  }

  onTypingStart(handler: WebSocketEventHandler<TypingStartEvent>) {
    return this.on("typing_start", handler);
  }

  onTypingStop(handler: WebSocketEventHandler<TypingStopEvent>) {
    return this.on("typing_stop", handler);
  }

  // Utility methods for sending events
  startTyping(channelId: string) {
    this.send({
      type: "typing_start",
      data: { channelId },
    });
  }

  stopTyping(channelId: string) {
    this.send({
      type: "typing_stop",
      data: { channelId },
    });
  }

  // Subscribe/unsubscribe to specific channels
  subscribeToChannel(channelId: string) {
    this.send({
      type: "subscribe",
      data: { channelId },
    });
  }

  unsubscribeFromChannel(channelId: string) {
    this.send({
      type: "unsubscribe",
      data: { channelId },
    });
  }
}
