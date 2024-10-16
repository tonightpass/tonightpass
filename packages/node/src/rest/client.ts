import { pathcat } from "pathcat";
import { Options, Response as RedaxiosResponse } from "redaxios";

import { ParamValue, Query } from "..";
import { APIResponse, Endpoints, ErroredAPIResponse } from "./endpoints";
import { APIRequestOptions, request } from "./request";
import { DEFAULT_API_URL } from "../constants";

export type PathsFor<M extends Options["method"]> = Extract<
  Endpoints,
  { method: M }
>["path"];

export type Response<
  M extends Options["method"],
  P extends PathsFor<M>,
> = APIResponse<Extract<Endpoints, { method: M; path: P }>["res"]>;

export type Body<M extends Options["method"], P extends PathsFor<M>> = Extract<
  Endpoints,
  { method: M; path: P }
>["body"];

export class TonightPassAPIError<T> extends Error {
  public readonly status: number;

  constructor(
    public readonly response: RedaxiosResponse<APIResponse<T>>,
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
    return this.requester<Response<"GET", Path>>(
      "GET",
      path,
      undefined,
      query,
      options,
    );
  }

  async post<Path extends PathsFor<"POST">>(
    path: Path,
    body: Body<"POST", Path>,
    query?: Query<Path>,
    options?: APIRequestOptions,
  ) {
    return this.requester<Response<"POST", Path>>(
      "POST",
      path,
      body,
      query,
      options,
    );
  }

  async put<Path extends PathsFor<"PUT">>(
    path: Path,
    body: Body<"PUT", Path>,
    query?: Query<Path>,
    options?: APIRequestOptions,
  ) {
    return this.requester<Response<"PUT", Path>>(
      "PUT",
      path,
      body,
      query,
      options,
    );
  }

  async patch<Path extends PathsFor<"PATCH">>(
    path: Path,
    body: Body<"PATCH", Path>,
    query?: Query<Path>,
    options?: APIRequestOptions,
  ) {
    return this.requester<Response<"PATCH", Path>>(
      "PATCH",
      path,
      body,
      query,
      options,
    );
  }

  async delete<Path extends PathsFor<"DELETE">>(
    path: Path,
    body: Body<"DELETE", Path>,
    query?: Query<Path>,
    options?: APIRequestOptions,
  ) {
    return this.requester<Response<"DELETE", Path>>(
      "DELETE",
      path,
      body,
      query,
      options,
    );
  }

  private async requester<T>(
    method: Options["method"],
    path: string,
    body: unknown,
    query: Query<string> = {},
    options: APIRequestOptions = {},
  ) {
    const url = this.url(path, query);

    if (body !== undefined) {
      if (method === "GET") {
        throw new Error("Cannot send a GET request with a body");
      }
    }

    const response: RedaxiosResponse<APIResponse<T>> = await request<T>(url, {
      method,
      data: body,
      ...options,
    });

    const result = response.data;

    if (!result.success) {
      throw new TonightPassAPIError<T>(response, result);
    }

    return result.data;
  }
}
