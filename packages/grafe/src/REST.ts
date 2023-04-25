import {
  ApolloClient,
  DocumentNode,
  NormalizedCacheObject,
} from "@apollo/client";

import type { RestQueryResponse } from "./types/rest-query-response";

export class REST {
  constructor(protected readonly client: ApolloClient<NormalizedCacheObject>) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async query<TData = any>(
    query: DocumentNode,
    variables?: Record<string, unknown>
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
      .catch((err) => {
        console.log("error at query : " + err);
        throw err;
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public mutate<TData = any>(
    mutation: DocumentNode,
    variables?: Record<string, unknown>
  ): Promise<RestQueryResponse<TData>> {
    return this.client
      .mutate<TData>({
        mutation,
        update(_cache, { data }, { context }) {
          console.log("context from mutate : ", context);
        },
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
        console.log("result from mutate : " + result);

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
      .catch((err) => {
        console.log("error at mutate : " + err);
        throw err;
      });
  }
}

//TODO: ici ça doit déjà récupérer l'erreur avec un then catch comme ici https://github.com/apollographql/apollo-client/blob/main/src/react/hooks/useMutation.ts
// et ensuite les API retournent un tableau [data, error].
// Et pour le hook, la fonction d'execution récupère ces valeurs `const [data, error] = await action(...)`
