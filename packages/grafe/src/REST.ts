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
  public async query(query: DocumentNode, variables?: Record<string, unknown>) {
    const result = await this.client.query({
      query,
      variables,
    });

    if (result.errors) {
      return new Promise((_, reject) => {
        reject(result.errors);
      });
    }

    return result.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async mutate(
    mutation: DocumentNode,
    variables?: Record<string, unknown>
  ) {
    const result = await this.client.mutate({
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

    console.log(result);

    if (result.errors) {
      return new Promise((_, reject) => {
        reject(result.errors);
      });
    }

    return result.data;
  }
}
