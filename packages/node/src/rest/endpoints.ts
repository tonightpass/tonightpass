import { Options } from "redaxios";

import {
  AuthEndpoints,
  CareersEndpoints,
  HealthEndpoints,
  NotificationsEndpoints,
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
  | CareersEndpoints
  | HealthEndpoints
  | OrderEndpoints
  | OrganizationEndpoints
  | ProfileEndpoints
  | UserEndpoints
  | WebhookEndpoints
  | NotificationsEndpoints;
