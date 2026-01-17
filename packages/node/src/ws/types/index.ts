export * from "./channels";

export type WebSocketEvent<T = unknown> = {
  type: string;
  data: T;
};

export type WebSocketConnectOptions = {
  token?: string;
  channelId?: string;
  organizationSlug?: string;
};

export type WebSocketClientOptions = {
  baseURL: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  debug?: boolean;
};
