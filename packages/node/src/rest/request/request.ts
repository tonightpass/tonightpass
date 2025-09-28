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
      console.log("transformRequest called with:", {
        dataType: data?.constructor?.name,
        isFormData: data instanceof FormData,
        headers,
      });

      if (data instanceof FormData) {
        console.log("FormData detected - removing Content-Type header");
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
          console.log("Content-Type removed and headers normalized");
        }
        console.log("Final headers for FormData:", headers);
        return data;
      } else {
        console.log("Regular data - setting Content-Type to application/json");
        if (headers) {
          (
            headers as {
              [name: string]: string;
            }
          )["Content-Type"] = "application/json";
        }
        console.log("Final headers for JSON:", headers);
        return JSON.stringify(data);
      }
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
