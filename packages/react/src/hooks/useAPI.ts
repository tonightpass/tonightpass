import useSWR, { Fetcher } from "swr";
import {
  Endpoints,
  APIRequestOptions,
  Client,
  PathsFor,
  Query,
  DEFAULT_API_URL,
} from "tonightpass";

export const client = new Client({ baseURL: DEFAULT_API_URL });

export const useAPI = <Path extends PathsFor<"GET">>(
  path: Path,
  query?: Query<Path>,
  options?: APIRequestOptions,
) => {
  const fetcher: Fetcher<any> = (key: Path) => client.get(key, query, options);

  return useSWR<Extract<Endpoints, { path: Path; method: "GET" }>["res"]>(
    path,
    fetcher,
  );
};
