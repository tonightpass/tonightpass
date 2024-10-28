import { Options } from "redaxios";

import {
  AuthEndpoints,
  CareerEndpoints,
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
  | AuthEndpoints
  | CareerEndpoints
  | HealthEndpoints
  | OrderEndpoints
  | OrganizationEndpoints
  | ProfileEndpoints
  | UserEndpoints
  | WebhookEndpoints
  | NotificationEndpoints;
