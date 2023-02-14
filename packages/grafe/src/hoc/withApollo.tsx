import React from "react";

import { ApolloClient, Context, NormalizedCacheObject } from "@apollo/client";
import { NextComponentType, NextPageContext } from "next";

import { createApolloClient } from "../client/apollo-client";

let globalApolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const initApolloClient = (
  initialState: NormalizedCacheObject,
  ctx: Context
) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") {
    return createApolloClient(initialState, ctx);
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState, ctx);
  }

  return globalApolloClient;
};

interface WithApolloProps {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  apolloState: NormalizedCacheObject;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getHeaders(ctx: any) {
  if (typeof window !== "undefined") return null;
  if (typeof ctx.req === "undefined") return null;

  const s = { accessToken: null }; //await auth0.getSession(ctx.req);
  if (s && s.accessToken == null) return null;

  return {
    authorization: `Bearer ${s ? s.accessToken : ""}`,
  };
}

/**
 * Creates a withApollo HOC
 * that provides the apolloContext
 * to a next.js Page or AppTree.
 * @param  {Object} withApolloOptions
 * @param  {Boolean} [withApolloOptions.ssr=false]
 * @returns {(PageComponent: ReactNode) => ReactNode}
 */
export const withApollo =
  ({ ssr = false } = {}) =>
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  (PageComponent: NextComponentType<NextPageContext, any, any>) => {
    const WithApollo = ({
      apolloClient,
      apolloState,
      ...pageProps
    }: WithApolloProps) => {
      const client =
        apolloClient || initApolloClient(apolloState, { getHeaders });

      return <PageComponent {...pageProps} apolloClient={client} />;
    };

    // Set the correct displayName in development
    if (process.env.NODE_ENV !== "production") {
      const displayName =
        PageComponent.displayName || PageComponent.name || "Component";

      if (displayName === "App") {
        console.warn("This withApollo HOC only works with PageComponents.");
      }

      WithApollo.displayName = `withApollo(${displayName})`;
    }

    if (ssr || PageComponent.getInitialProps) {
      WithApollo.getInitialProps = async (ctx: any) => {
        const { AppTree } = ctx;

        // Initialize ApolloClient, add it to the ctx object so
        // we can use it in `PageComponent.getInitialProp`.
        const apolloClient = (ctx.apolloClient = initApolloClient(
          {},
          {
            getToken: () => getHeaders(ctx.req),
          }
        ));

        // Run wrapped getInitialProps methods
        let pageProps = {};
        if (PageComponent.getInitialProps) {
          pageProps = await PageComponent.getInitialProps(ctx);
        }

        // Only on the server:
        if (typeof window === "undefined") {
          // When redirecting, the response is finished.
          // No point in continuing to render
          if (ctx.res && ctx.res.finished) {
            return pageProps;
          }

          // Only if ssr is enabled
          if (ssr) {
            try {
              // Run all GraphQL queries
              const { getDataFromTree } = await import(
                "@apollo/client/react/ssr"
              );
              await getDataFromTree(
                <AppTree
                  pageProps={{
                    ...pageProps,
                    apolloClient,
                  }}
                />
              );
            } catch (error) {
              // Prevent Apollo Client GraphQL errors from crashing SSR.
              // Handle them in components via the data.error prop:
              // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
              console.error("Error while running `getDataFromTree`", error);
            }
          }
        }

        // Extract query data from the Apollo store
        const apolloState = apolloClient.cache.extract();

        return {
          ...pageProps,
          apolloState,
        };
      };
    }

    return WithApollo;
  };
