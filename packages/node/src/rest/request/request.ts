import axios, { Options, Response } from "redaxios";

import { isBrowser } from "../../utils";
import { APIResponse, ErroredAPIResponse } from "../client";

const instance = axios.create({
  headers: {
    Accept: "application/json",
    ...(!isBrowser && { "User-Agent": "tonightpass-api-client" }),
  },
  responseType: "json",
  transformRequest: [
    function (data, headers) {
      if (data instanceof FormData) {
        if (headers && typeof headers === "object") {
          const normalizedHeaders = {} as { [key: string]: string };
          for (const [key, value] of Object.entries(
            headers as { [key: string]: string },
          )) {
            const lowerKey = key.toLowerCase();
            if (lowerKey !== "content-type") {
              normalizedHeaders[lowerKey] = value;
            }
          }
          Object.keys(headers as { [key: string]: string }).forEach(
            (key) => delete (headers as { [key: string]: string })[key],
          );
          Object.assign(headers, normalizedHeaders);
        }
        return data;
      } else if (data === undefined || data === null) {
        // No body, no Content-Type header needed
        return undefined;
      } else {
        if (headers) {
          (
            headers as {
              [name: string]: string;
            }
          )["Content-Type"] = "application/json";
        }
        return JSON.stringify(data);
      }
    },
  ],
  withCredentials: isBrowser,
});

export interface APIRequestOptions extends Options {
  apiKey?: string;
  accessToken?: string;
}

export const request = async <T>(url: string, options?: APIRequestOptions) => {
  const { apiKey, accessToken, ...requestOptions } = options || {};

  const headers = {
    ...requestOptions.headers,
    ...(apiKey && { "X-API-Key": apiKey }),
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
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
