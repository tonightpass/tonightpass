import { Channel } from "../../../rest/types/channels";
import { ChannelMessage } from "../../../rest/types/channels/messages";
import { User } from "../../../rest/types/users";
import { WebSocketEvent } from "../index";

export interface ChannelMessageCreateEvent extends WebSocketEvent<ChannelMessage> {
  type: "channel_message_create";
}

export interface ChannelMessageUpdateEvent extends WebSocketEvent<ChannelMessage> {
  type: "channel_message_update";
}

export interface ChannelMessageDeleteEvent extends WebSocketEvent<{
  id: string;
  channelId: string;
}> {
  type: "channel_message_delete";
}

export interface ChannelUpdateEvent extends WebSocketEvent<Channel> {
  type: "channel_update";
}

export interface ChannelDeleteEvent extends WebSocketEvent<{ id: string }> {
  type: "channel_delete";
}

export interface ChannelMemberJoinEvent extends WebSocketEvent<{
  channel: Channel;
  user: User;
}> {
  type: "channel_member_join";
}

export interface ChannelMemberLeaveEvent extends WebSocketEvent<{
  channelId: string;
  userId: string;
}> {
  type: "channel_member_leave";
}

export interface TypingStartEvent extends WebSocketEvent<{
  channelId: string;
  userId: string;
  username: string;
}> {
  type: "typing_start";
}

export interface TypingStopEvent extends WebSocketEvent<{
  channelId: string;
  userId: string;
}> {
  type: "typing_stop";
}

export type ChannelWebSocketEvent =
  | ChannelMessageCreateEvent
  | ChannelMessageUpdateEvent
  | ChannelMessageDeleteEvent
  | ChannelUpdateEvent
  | ChannelDeleteEvent
  | ChannelMemberJoinEvent
  | ChannelMemberLeaveEvent
  | TypingStartEvent
  | TypingStopEvent;
