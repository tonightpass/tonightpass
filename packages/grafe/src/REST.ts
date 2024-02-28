import {
  ApolloClient,
  DocumentNode,
  NormalizedCacheObject,
} from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";

import type { RestQueryResponse } from "./types/rest-query-response";

export class REST {
  constructor(protected readonly client: ApolloClient<NormalizedCacheObject>) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async query<TData = any>(
    query: DocumentNode,
    variables?: Record<string, unknown>,
  ): Promise<RestQueryResponse<TData>> {
    return this.client
      .query({
        query,
        variables,
      })
      .then((result) => {
        if (result.errors) {
          return {
            success: false as const,
            error: result.errors[0].message,
          };
        }

        return {
          success: true as const,
          data: result.data as TData,
        };
      })
      .catch((err: ApolloError) => {
        throw err.message;
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public mutate<TData = any>(
    mutation: DocumentNode,
    variables?: Record<string, unknown>,
  ): Promise<RestQueryResponse<TData>> {
    return this.client
      .mutate<TData>({
        mutation,
        variables,
        context: {
          fetchOptions: {
            credentials: "include",
          },
          response: {
            headers: true,
          },
        },
      })
      .then((result) => {
        if (result.errors) {
          return {
            success: false as const,
            error: result.errors[0].message,
          };
        }

        return {
          success: true as const,
          data: result.data as TData,
        };
      })
      .catch((err: ApolloError) => {
        throw err.message;
      });
  }
}
