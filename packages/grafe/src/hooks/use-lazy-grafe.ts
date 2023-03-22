import React from "react";

import { GrafeClient } from "../client";
import { GrafeContext } from "../contexts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Variables = { [key: string]: any };

/**
 * A hook that provides a GrafeClient instance and returns data as TData.
 * You can use this hook to fetch data from Grafe.
 *
 * @example
 * const [handleAction, [loading, success, data, error]] = useLazyGrafe((client, { id }) => client.users.get(id));
 *
 * <button onClick={() => handleAction({ id: 1 })}>Fetch</button>
 *
 * @param action A function that provides a GrafeClient instance and returns data as TData.
 * @returns A tuple of [handleAction, [loading, success, data, error]]
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useLazyGrafe = <TData = any>(
  action: (
    client: GrafeClient,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    variables: { [key: string]: any }
  ) => Promise<TData>
): [
  (variables: Variables) => void,
  [boolean, boolean, TData | undefined, string | undefined]
] => {
  const { client } = React.useContext(GrafeContext);

  if (!client) {
    throw new Error("Grafe client not found");
  }

  const [state, setState] = React.useState<{
    loading: boolean;
    success: boolean;
    data: TData | undefined;
    error: string | undefined;
  }>({ loading: false, success: false, data: undefined, error: undefined });

  const handleAction = (variables: Variables) => {
    setState({
      ...state,
      loading: true,
    });

    action(client, variables)
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
  };

  return [
    handleAction,
    [state.loading, state.success, state.data, state.error],
  ];
};
