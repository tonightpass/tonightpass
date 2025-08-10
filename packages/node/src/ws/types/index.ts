export * from "./channels";

export interface WebSocketEvent<T = unknown> {
  type: string;
  data: T;
}

export interface WebSocketConnectOptions {
  token?: string;
  channelId?: string;
  organizationSlug?: string;
}

export interface WebSocketClientOptions {
  baseURL: string;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
  debug?: boolean;
}
