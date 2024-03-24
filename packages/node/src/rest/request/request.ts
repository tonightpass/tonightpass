import { APIError, APIResponse } from "@tonightpass/shared-types";
import axios, { Options } from "redaxios";

type ApiRequestConfig = Exclude<Options, "method">;

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
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

const request = async <TData>(
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
export default request;
