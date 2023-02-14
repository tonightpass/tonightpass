import {
  NormalizedCacheObject,
  ApolloClient,
  HttpOptions,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { isUri } from "../utils/is-uri";

export const createApolloClient = (
  initialState: NormalizedCacheObject,
  ctx?: any
): ApolloClient<NormalizedCacheObject> => {
  if (
    !process.env.NEXT_PUBLIC_GRAPH_URL ||
    !isUri(process.env.NEXT_PUBLIC_GRAPH_URL)
  ) {
    throw new Error("NEXT_PUBLIC_GRAPH_URL is not set or is not an valid uri");
  }

  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPH_URL,
    credentials: "same-origin",
  });

  const authLink = setContext((_, { headers }) => {
    const headerPrefix = process.env.NEXT_PUBLIC_JWT_HEADER_PREFIX || "Bearer";

    const token = localStorage.getItem("jwt_token");

    return {
      headers: {
        ...headers,
        authorization: token ? `${headerPrefix} ${token}` : "",
      },
    };
  });

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
