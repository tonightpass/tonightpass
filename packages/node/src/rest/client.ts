import { ParamValue, pathcat } from "pathcat";

import { ApiRequestConfig, requester } from "./request";
import { DEFAULT_API_URL } from "../constants";

export interface ClientOptions {
  readonly baseUrl: string;
}

export class Client {
  private readonly options;
  public readonly url;
  private request = requester();

  constructor(options: ClientOptions) {
    this.options = options;
    this.url = (path: string, params: Record<string, ParamValue>) => {
      const baseUrl = DEFAULT_API_URL || this.options.baseUrl;
      return pathcat(baseUrl, path, params);
    };
  }

  async get<T>(url: string, options?: ApiRequestConfig) {
    return this.request.get<T>(url, options);
  }

  async post<T>(url: string, options?: ApiRequestConfig) {
    return this.request.post<T>(url, options);
  }

  async put<T>(url: string, options?: ApiRequestConfig) {
    return this.request.put<T>(url, options);
  }

  async delete<T>(url: string, options?: ApiRequestConfig) {
    return this.request.delete<T>(url, options);
  }
}
