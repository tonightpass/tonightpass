import {
  NormalizedCacheObject,
  ApolloClient,
  HttpOptions,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { isUri } from "../utils/is-uri";

type CreateApolloClientOptions = {
  initialState?: NormalizedCacheObject;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ctx?: any;
  graphqlUrl: string;
  jwtHeaderPrefix?: string;
};

const getJwtToken = async (): Promise<string | null> => {
  if (require("expo-secure-store") == undefined) {
    return localStorage.getItem("jwt_token");
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return await require("expo-secure-store").getItemAsync("jwt_token");
  }
};

export const createApolloClient = async ({
  initialState,
  ctx,
  graphqlUrl,
  jwtHeaderPrefix = "Bearer",
}: CreateApolloClientOptions): Promise<ApolloClient<NormalizedCacheObject>> => {
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
    const token = await getJwtToken();

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
