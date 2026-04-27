import type { Endpoint } from "../../endpoints";

export type ProxyMediaOptions = {
  token: string;
};

export type ProxyMediaResponse = ArrayBuffer;

export type ProxyEndpoints = Endpoint<
  "GET",
  "/proxy/media",
  ProxyMediaResponse,
  ProxyMediaOptions
>;
