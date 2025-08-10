import { WebSocketConnectOptions } from "./types";
import { Endpoints } from "../rest/endpoints";

type GETEndpoints = Extract<Endpoints, { method: "GET" }>;

type RESTEndpointPaths = GETEndpoints["path"];

export type WebSocketPath<T extends string> =
  T extends `${RESTEndpointPaths}/ws` ? T : never;

export type WebSocketEndpoint<
  Path extends string,
  ConnectOptions = undefined,
> = {
  path: WebSocketPath<Path>;
  options: ConnectOptions;
};

export type WebSocketEndpoints =
  | WebSocketEndpoint<"/channels/@me/ws", WebSocketConnectOptions>
  | WebSocketEndpoint<
      "/channels/@me/:channelId/ws",
      WebSocketConnectOptions & { channelId: string }
    >
  | WebSocketEndpoint<
      "/channels/:organizationSlug/ws",
      WebSocketConnectOptions & { organizationSlug: string }
    >
  | WebSocketEndpoint<
      "/channels/:organizationSlug/:channelId/ws",
      WebSocketConnectOptions & { organizationSlug: string; channelId: string }
    >;

export type WebSocketPaths = WebSocketEndpoints["path"];

export type WebSocketPathsFor = Extract<
  WebSocketEndpoints,
  { path: string }
>["path"];

export type WebSocketOptionsFor<P extends WebSocketPaths> = Extract<
  WebSocketEndpoints,
  { path: P }
>["options"];
