import useSWR, { type SWRConfiguration, type SWRResponse } from "swr";
import {
  type APIRequestOptions,
  Client,
  DEFAULT_API_URL,
  type Endpoints,
  type PathsFor,
  type Query,
  type TonightPassAPIError,
} from "tonightpass";

export const client = new Client({ baseURL: DEFAULT_API_URL });

type AnyEndpoint = Endpoints extends infer T ? T : never;

type ForceAccept<T> = T extends never ? any : T;

export type ResponseType<Path extends PathsFor<"GET">> = ForceAccept<
  Extract<AnyEndpoint, { path: Path; method: "GET" }>["res"]
>;

export type ErrorType<Path extends PathsFor<"GET">> = TonightPassAPIError<
  ResponseType<Path>
>;

export interface UseAPIConfig<Path extends PathsFor<"GET">>
  extends SWRConfiguration<ResponseType<Path>, ErrorType<Path>> {
  requestOptions?: APIRequestOptions;
}

export function useAPI<Path extends PathsFor<"GET">>(
  path: Path | null | undefined,
  query?: Query<Path>,
  config?: UseAPIConfig<Path>
): SWRResponse<ResponseType<Path>, ErrorType<Path>> {
  const { requestOptions, ...swrConfig } = config || {};

  const fetcher = async ([fetchPath, fetchQuery]: [
    Path,
    Query<Path> | undefined,
  ]) => {
    const response = await client.get(fetchPath, fetchQuery, requestOptions);
    return response as unknown as ResponseType<Path>;
  };

  return useSWR<
    ResponseType<Path>,
    ErrorType<Path>,
    [Path, Query<Path> | undefined] | null
  >(path ? [path, query] : null, fetcher, swrConfig);
}
