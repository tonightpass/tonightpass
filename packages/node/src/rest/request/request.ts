import axios, { Options, Response } from "redaxios";

import { isBrowser } from "../../utils";
import { APIResponse, ErroredAPIResponse } from "../client";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(!isBrowser && { "User-Agent": "tonightpass-api-client" }),
  },
  responseType: "json",
  transformRequest: [
    function (data, headers) {
      if (data instanceof FormData) {
        if (
          headers &&
          typeof headers === "object" &&
          "Content-Type" in headers
        ) {
          delete headers["Content-Type"];
        }
        return data;
      }

      if (headers) {
        (
          headers as {
            [name: string]: string;
          }
        )["Content-Type"] = "application/json";
      }
      return JSON.stringify(data);
    },
  ],
  withCredentials: isBrowser,
});

export interface APIRequestOptions extends Options {
  apiKey?: string;
}

export const request = async <T>(url: string, options?: APIRequestOptions) => {
  const { apiKey, ...requestOptions } = options || {};

  const headers = {
    ...requestOptions.headers,
    ...(apiKey && { "X-API-Key": apiKey }),
  };

  const response = instance<APIResponse<T>>(url, {
    ...requestOptions,
    headers,
  })
    .then((response) => response)
    .catch((error: Response<ErroredAPIResponse>) => {
      if (!error.data) {
        console.error(error);
      }
      throw error.data;
    });

  return response;
};
