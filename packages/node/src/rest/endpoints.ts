import { Options } from "redaxios";

import {
  CareersEndpoints,
  HealthEndpoints,
  ProfileEndpoints,
  UserEndpoints,
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
  | CareersEndpoints
  | HealthEndpoints
  | ProfileEndpoints
  | UserEndpoints;
