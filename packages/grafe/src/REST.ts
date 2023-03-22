import {
  ApolloClient,
  DocumentNode,
  NormalizedCacheObject,
  OperationVariables,
  TypedDocumentNode,
} from "@apollo/client";

export class REST {
  constructor(protected readonly client: ApolloClient<NormalizedCacheObject>) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async query<T = any>(
    query: DocumentNode | TypedDocumentNode<T, OperationVariables>,
    variables?: Record<string, unknown>
  ): Promise<T> {
    const result = await this.client.query<T>({
      query,
      variables,
    });

    if (result.errors) {
      return new Promise<T>((_, reject) => {
        reject(result.errors);
      });
    }

    return result.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async mutate<T = any>(
    mutation: DocumentNode | TypedDocumentNode<T, OperationVariables>,
    variables?: Record<string, unknown>
  ): Promise<T> {
    const result = await this.client.mutate<T>({
      mutation,
      update(cache, { data }, { context }) {
        console.log(context);
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
    });

    if (result.errors) {
      return new Promise<T>((_, reject) => {
        reject(result.errors);
      });
    }

    return result.data as T;
  }
}
