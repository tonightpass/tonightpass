import {
  NormalizedCacheObject,
  ApolloClient,
  HttpOptions,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { isUri } from "../utils/is-uri";

interface CreateApolloClientOptions {
  initialState?: NormalizedCacheObject;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx?: any;
  graphqlUrl: string;
  jwtHeaderPrefix?: string;
}

export const createApolloClient = ({
  initialState,
  ctx,
  graphqlUrl,
  jwtHeaderPrefix = "Bearer",
}: CreateApolloClientOptions): ApolloClient<NormalizedCacheObject> => {
  if (!isUri(graphqlUrl)) {
    throw new Error("graphqlUrl is not set or is not an valid uri");
  }

  const httpLink = createHttpLink({
    uri: graphqlUrl,
    credentials: "same-origin",
  });

  const authLink = setContext((_, { headers }) => {
    const headerPrefix = jwtHeaderPrefix;

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
