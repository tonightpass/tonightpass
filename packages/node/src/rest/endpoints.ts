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

export type SuccessfulAPIResponse<T> = {
  success: true;
  data: T;
};

export type ErroredAPIResponse = {
  success: false;
  message: string;
  errors?: {
    [key: string]: string;
  };
};

export type APIResponse<T> = SuccessfulAPIResponse<T> | ErroredAPIResponse;

export type PromisedAPIResponse<T> = Promise<APIResponse<T>>;

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
