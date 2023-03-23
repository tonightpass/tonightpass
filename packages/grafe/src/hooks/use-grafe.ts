import React from "react";

import { GrafeClient } from "../client/grafe-client";
import { GrafeContext } from "../contexts/Grafe";

/**
 * A hook that provides a GrafeClient instance and returns data as TData.
 * You can use this hook to fetch data from Grafe.
 *
 * @example
 * const [loading, success, data, error] = useGrafe((client) => client.users.get(`${id}`));
 *
 * @param action A function that provides a GrafeClient instance and returns data as TData.
 * @returns A tuple of [loading, success, data, error]
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useGrafe = <TData = any>(
  action: (client: GrafeClient) => Promise<TData>
): [boolean, boolean, TData | undefined, string | Error | undefined] => {
  const { client } = React.useContext(GrafeContext);

  if (!client) {
    throw new Error("Grafe client not found");
  }

  const [state, setState] = React.useState<{
    loading: boolean;
    success: boolean;
    data: TData | undefined;
    error: string | Error | undefined;
  }>({ loading: false, success: false, data: undefined, error: undefined });

  React.useEffect(() => {
    setState({
      ...state,
      loading: true,
    });

    action(client)
      .then((result) => {
        setState({
          ...state,
          success: true,
          data: result,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          error: err,
        });
      })
      .finally(() => {
        setState({
          ...state,
          loading: false,
        });
      });
  }, [action, client, state]);

  return [state.loading, state.success, state.data, state.error];
};
