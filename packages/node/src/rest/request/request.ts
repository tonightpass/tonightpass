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
      // Check if headers is a plain object with a string key type
      if (
        typeof headers === "object" &&
        headers !== null &&
        !("append" in headers)
      ) {
        // If data is FormData, remove Content-Type and let Axios set it
        if (data instanceof FormData) {
          delete headers["Content-Type"];
          return data;
        }
        // Otherwise, set Content-Type for JSON
        headers["Content-Type"] = "application/json";
      }
      // Return JSON string for non-FormData
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
      if (!error.data) {
        console.error(error);
      }
      throw error.data;
    });

  return response;
};
