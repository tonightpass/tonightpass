import axios, { Options, Response } from "redaxios";

import { isBrowser } from "../../utils";
import { APIResponse, ErroredAPIResponse } from "../endpoints";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(!isBrowser && { "User-Agent": "tonightpass-api-client" }),
  },
  responseType: "json",
  transformRequest: [
    function (data) {
      return JSON.stringify(data);
    },
  ],
  withCredentials: isBrowser,
});

export interface APIRequestOptions extends Options {}

export const request = async <T>(url: string, options?: Options) => {
  const response = instance<APIResponse<T>>(url, { ...options })
    .then((response) => response)
    .catch((error: Response<ErroredAPIResponse>) => {
      throw error.data;
    });

  return response;
};
