import type { Options } from "redaxios";

import type {
  ApiKeyEndpoints,
  AuthEndpoints,
  CareerEndpoints,
  ChannelEndpoints,
  ChannelMessageEndpoints,
  CurrenciesEndpoints,
  FeedEndpoints,
  HealthEndpoints,
  NotificationEndpoints,
  OrderEndpoints,
  OrganizationEndpoints,
  PlaceEndpoints,
  ProfileEndpoints,
  RoadmapEndpoints,
  UserEndpoints,
  WebhookEndpoints,
} from "./types";

export type Endpoint<
  M extends Options["method"],
  Path extends string,
  Res,
  Body = undefined,
> = {
  method: M;
  path: Path;
  res: Res;
  body: Body;
};

export type SSEEndpoints =
  Extract<Endpoints, { method: "GET" }> extends infer E
    ? E extends { res: ReadableStream<infer _>; path: infer P }
      ? P
      : never
    : never;

export type Endpoints =
  | ApiKeyEndpoints
  | AuthEndpoints
  | CareerEndpoints
  | ChannelEndpoints
  | ChannelMessageEndpoints
  | CurrenciesEndpoints
  | FeedEndpoints
  | HealthEndpoints
  | OrderEndpoints
  | OrganizationEndpoints
  | PlaceEndpoints
  | ProfileEndpoints
  | RoadmapEndpoints
  | UserEndpoints
  | WebhookEndpoints
  | NotificationEndpoints;
