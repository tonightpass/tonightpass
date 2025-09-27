import { Options } from "redaxios";

import {
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
  ProfileEndpoints,
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
  | ProfileEndpoints
  | UserEndpoints
  | WebhookEndpoints
  | NotificationEndpoints;
