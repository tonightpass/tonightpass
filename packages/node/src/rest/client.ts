import { Method } from "axios";
import { ExtractRouteParams, ParamValue, pathcat } from "pathcat";
import { Options, Response } from "redaxios";

import { APIResponse, Endpoints, ErroredAPIResponse } from "./endpoints";
import { APIRequestOptions, request } from "./request";
import { DEFAULT_API_URL } from "../constants";

export type ExtractEndpoint<
  Method extends string,
  Path extends string,
> = Extract<Endpoints, { path: Path; method: Method }>;

export type PathsFor<M extends Method> = Extract<
  Endpoints,
  { method: M }
>["path"];

export type Query<Path extends string> = ExtractRouteParams<Path> &
  Record<string, string | number | undefined>;

export class TonightPassAPIError<T> extends Error {
  public readonly status: number;

  constructor(
    public readonly response: Response<APIResponse<T>>,
    public readonly data: ErroredAPIResponse,
  ) {
    super(data.message);

    this.status = response.status;
  }
}

export interface ClientOptions {
  readonly baseURL: string;
}

export class Client {
  private options;
  public readonly url;

  constructor(options: ClientOptions) {
    this.options = options;
    this.url = (path: string, params: Record<string, ParamValue>) => {
      const baseURL = this.options.baseURL || DEFAULT_API_URL;
      return pathcat(baseURL, path, params);
    };
  }

  setOptions(options: ClientOptions) {
    this.options = options;
  }

  async get<Path extends PathsFor<"GET">>(
    path: Path,
    query?: Query<Path>,
    options?: APIRequestOptions,
  ) {
    return this.requester<
      Extract<Endpoints, { path: Path; method: "GET" }>["res"]
    >("GET", path, undefined, query, options);
  }

  async post<Path extends Extract<Endpoints, { method: "POST" }>["path"]>(
    path: Path,
    body: Extract<Endpoints, { path: Path; method: "POST" }>["body"],
    query?: Query<Path>,
    options?: APIRequestOptions,
  ) {
    return this.requester<
      Extract<Endpoints, { path: Path; method: "POST" }>["res"]
    >("POST", path, body, query, options);
  }

  async put<Path extends Extract<Endpoints, { method: "PUT" }>["path"]>(
    path: Path,
    body: Extract<Endpoints, { path: Path; method: "PUT" }>["body"],
    query?: Query<Path>,
    options?: APIRequestOptions,
  ) {
    return this.requester<
      Extract<Endpoints, { path: Path; method: "PUT" }>["res"]
    >("PUT", path, body, query, options);
  }

  async patch<Path extends Extract<Endpoints, { method: "PATCH" }>["path"]>(
    path: Path,
    body: Extract<Endpoints, { path: Path; method: "PATCH" }>["body"],
    query?: Query<Path>,
    options?: APIRequestOptions,
  ) {
    return this.requester<
      Extract<Endpoints, { path: Path; method: "PATCH" }>["res"]
    >("PATCH", path, body, query, options);
  }

  async delete<Path extends Extract<Endpoints, { method: "DELETE" }>["path"]>(
    path: Path,
    query?: Query<Path>,
    options?: APIRequestOptions,
  ) {
    return this.requester<
      Extract<Endpoints, { path: Path; method: "DELETE" }>["res"]
    >("DELETE", path, undefined, query, options);
  }

  private async requester<T>(
    method: Options["method"],
    path: string,
    body: unknown,
    query: Record<string, string | number | undefined> = {},
    options: APIRequestOptions = {},
  ) {
    const url = this.url(path, query);

    if (body !== undefined) {
      if (method === "GET") {
        throw new Error("Cannot send a GET request with a body");
      }
    }

    const response: Response<APIResponse<T>> = await request<T>(url, {
      method,
      data: body,
      ...options,
    });

    // TODO: Add error catcher

    const result = response.data;

    if (!result.success) {
      throw new TonightPassAPIError<T>(response, result);
    }

    return result.data;
  }
}
