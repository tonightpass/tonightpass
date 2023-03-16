import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import React from "react";

import { GrafeClient } from "../client/grafe-client";

const GrafeContext = React.createContext<{ client: GrafeClient | undefined }>({
  client: undefined,
});

type GrafeProviderProps = {
  children: React.ReactNode;
  apolloClient: ApolloClient<NormalizedCacheObject>;
};

const GrafeProvider = ({
  children,
  apolloClient,
  ...props
}: GrafeProviderProps) => {
  const client = new GrafeClient({ apolloClient });

  return (
    <GrafeContext.Provider value={{ client }} {...props}>
      {children}
    </GrafeContext.Provider>
  );
};

export { GrafeContext, GrafeProvider };
