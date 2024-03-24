import axios, { Options } from "redaxios";

import { APIError, APIResponse } from "../types";

type ApiRequestConfig = Exclude<Options, "method">;

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  responseType: "json",
  transformRequest: [
    function (data) {
      return JSON.stringify(data);
    },
  ],
});

export const request = async <TData>(
  url: string,
  options?: ApiRequestConfig,
): Promise<APIResponse<TData>> => {
  const response = instance<APIResponse<TData>>(url, { ...options })
    .then((response) => response.data)
    .catch((error: APIError) => {
      throw error;
    });

  return response;
};

export type { ApiRequestConfig };
