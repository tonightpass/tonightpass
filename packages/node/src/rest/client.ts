import { ParamValue, pathcat } from "pathcat";

import { ApiRequestConfig, requester } from "./request";
import { DEFAULT_API_URL } from "../constants";

export interface ClientOptions {
  readonly baseURL: string;
}

export class Client {
  private readonly options;
  public readonly url;
  private request = requester();

  constructor(options: ClientOptions) {
    this.options = options;
    this.url = (path: string, params: Record<string, ParamValue>) => {
      const baseURL = DEFAULT_API_URL || this.options.baseURL;
      return pathcat(baseURL, path, params);
    };
  }

  async get<T>(url: string, options?: ApiRequestConfig) {
    return this.request.get<T>(url, { ...this.options, ...options });
  }

  async post<T>(url: string, options?: ApiRequestConfig) {
    return this.request.post<T>(url, { ...this.options, ...options });
  }

  async put<T>(url: string, options?: ApiRequestConfig) {
    return this.request.put<T>(url, { ...this.options, ...options });
  }

  async delete<T>(url: string, options?: ApiRequestConfig) {
    return this.request.delete<T>(url, { ...this.options, ...options });
  }
}
