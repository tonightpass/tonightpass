import {
  NormalizedCacheObject,
  ApolloClient,
  HttpOptions,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { isUri } from "../utils/is-uri";

type GrafeClientOptions = {
  initialState?: NormalizedCacheObject;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx?: any;
  graphqlUrl: string;
  jwtHeaderPrefix?: string;
  storage?: {
    setStorageFunction: (name: string, value: string) => void;
    getStorageFunction: (name: string) => string | null;
    isStorageFunction?: (name: string) => boolean;
  };
};

export const createApolloClient = async ({
  initialState,
  ctx,
  graphqlUrl,
  jwtHeaderPrefix = "Bearer",
  storage = {
    setStorageFunction: (name: string, value: string) => {
      localStorage.setItem(name, value);
    },
    getStorageFunction: (name: string) => {
      return localStorage.getItem(name);
    },
    isStorageFunction: (name: string) => {
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

  const createAuthLink = async () => {
    const token = await storage.getStorageFunction("jwt_token");

    return setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `${jwtHeaderPrefix} ${token}` : "",
        },
      };
    });
  };
  const authLink = await createAuthLink();

  const cache = new InMemoryCache().restore(initialState || {});

  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: authLink.concat(httpLink),
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
