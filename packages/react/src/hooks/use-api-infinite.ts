import useSWRInfinite, {
  SWRInfiniteConfiguration,
  SWRInfiniteResponse,
} from "swr/infinite";
import { APIRequestOptions, PathsFor, Query } from "tonightpass";

import { client, ResponseType, ErrorType } from "./use-api";

export interface UseAPIInfiniteConfig<
  Path extends PathsFor<"GET">,
> extends SWRInfiniteConfiguration<ResponseType<Path>, ErrorType<Path>> {
  requestOptions?: APIRequestOptions;
}

export function useAPIInfinite<Path extends PathsFor<"GET">>(
  getKey: (
    pageIndex: number,
    previousPageData: ResponseType<Path> | null,
  ) => [Path, Query<Path> | undefined] | null,
  config?: UseAPIInfiniteConfig<Path>,
): SWRInfiniteResponse<ResponseType<Path>, ErrorType<Path>> {
  const { requestOptions, ...swrConfig } = config || {};

  const fetcher = async ([fetchPath, fetchQuery]: [
    Path,
    Query<Path> | undefined,
  ]) => {
    const response = await client.get(fetchPath, fetchQuery, requestOptions);
    return response as unknown as ResponseType<Path>;
  };

  return useSWRInfinite(getKey, fetcher, swrConfig);
}
