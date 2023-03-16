import {
  ApolloClient,
  DocumentNode,
  NormalizedCacheObject,
  OperationVariables,
  TypedDocumentNode,
} from "@apollo/client";

import { APIResponse } from "./types/api-response";

export class REST {
  constructor(protected readonly client: ApolloClient<NormalizedCacheObject>) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async query<T = any>(
    query: DocumentNode | TypedDocumentNode<T, OperationVariables>,
    variables?: Record<string, unknown>
  ): Promise<APIResponse<T>> {
    const result = await this.client.query<T>({
      query,
      variables,
    });

    if (result.errors) {
      return {
        success: false,
        error: result.errors[0].message,
      };
    }

    return {
      success: true,
      data: result.data,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async mutate<T = any>(
    mutation: DocumentNode | TypedDocumentNode<T, OperationVariables>,
    variables?: Record<string, unknown>
  ): Promise<APIResponse<T>> {
    const result = await this.client.mutate<T>({
      mutation,
      variables,
    });

    if (result.errors) {
      return {
        success: false,
        error: result.errors[0].message,
      };
    }

    return {
      success: true,
      data: result.data as T,
    };
  }
}
