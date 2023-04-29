import {
  NormalizedCacheObject,
  ApolloClient,
  HttpOptions,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import { isUri } from "../utils/is-uri";

type GrafeClientOptions = {
  initialState?: NormalizedCacheObject;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx?: any;
  graphqlUrl: string;
  jwtHeaderPrefix?: string;
  storage?: {
    getStorageFunction: (name: string) => Promise<string | null>;
    setStorageFunction: (name: string, value: string) => Promise<void>;
    isStorageFunction?: (name: string) => Promise<boolean>;
  };
};

export const createApolloClient = async ({
  initialState,
  ctx,
  graphqlUrl,
  jwtHeaderPrefix = "Bearer",
  storage = {
    setStorageFunction: async (name: string, value: string) => {
      localStorage.setItem(name, value);
    },
    getStorageFunction: async (name: string) => {
      return localStorage.getItem(name);
    },
    isStorageFunction: async (name: string) => {
      return localStorage.getItem(name) !== null;
    },
  },
}: GrafeClientOptions): Promise<ApolloClient<NormalizedCacheObject>> => {
  if (!isUri(graphqlUrl)) {
    throw new Error("graphqlUrl is not set or is not an valid uri");
  }

  const httpLink = createHttpLink({
    uri: graphqlUrl,
    credentials: "same-origin",
    fetch: (uri, options) => {
      return fetch(uri, {
        ...options,
        credentials: "include",
      });
    },
  });

  const authLink = setContext((_req, { headers }) =>
    storage.getStorageFunction("access_token").then((token) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `${jwtHeaderPrefix} ${token}` : "caca",
        },
      };
    })
  );

  const refreshLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((data) => {
      const headers = operation.getContext().response.headers;
      const cookies = headers.get("Set-Cookie");

      // - If user is logged in, we will extract the access-token and refresh-token and set it to storage.
      if (cookies) {
        const accessToken = cookies.match(/access-token=([^;]*)/)[1];
        const refreshToken = cookies.match(/refresh-token=([^;]*)/)[1];

        storage.setStorageFunction("access_token", accessToken);
        storage.setStorageFunction("refresh_token", refreshToken);
      }

      return data;
    });
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (const err of graphQLErrors) {
          if (err.extensions?.code === "UNAUTHENTICATED") {
            // TODO: Rewrite the setContext with a new token
            return forward(operation);
          }
        }

        graphQLErrors.map(({ message, locations, path }) => {
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          );
        });
      }

      if (networkError) {
        console.error(`[Network error]: ${networkError}`);
      }

      return forward(operation);
    }
  );

  const cache = new InMemoryCache().restore(initialState || {});

  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: from([authLink, refreshLink, httpLink]),
    cache,
  });
};

const createHttpLink = (options: HttpOptions) => {
  return new HttpLink({
    ...options,
    fetch,
  });
};

export type { GrafeClientOptions };
