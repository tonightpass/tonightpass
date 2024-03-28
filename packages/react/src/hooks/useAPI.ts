import useSWR from "swr";
import {
  Endpoints,
  APIRequestOptions,
  Client,
  PathsFor,
  Query,
} from "tonightpass";

export const useAPI = <Path extends PathsFor<"GET">>(
  path: Path,
  query?: Query<Path>,
  options?: APIRequestOptions,
  client = new Client({ baseURL: "https://api.tonightpass.com" }),
) => {
  const fetcher = async (...args: Parameters<typeof fetch>) =>
    client.get(args[0], query, options);

  return useSWR<Extract<Endpoints, { path: Path; method: "GET" }>["res"]>(
    path,
    fetcher,
  );
};
