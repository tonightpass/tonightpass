import React from "react";

import { GrafeClient } from "../client";
import { GrafeContext } from "../contexts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestData = { variables: { [key: string]: any } };

const REQUEST_DATA_DEFAULT: RequestData = { variables: {} };

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
 * @param variables Variables to pass to the action function.
 * @returns A tuple of [handleAction, [loading, success, data, error]]
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useLazyGrafe = <TData = any>(
  action: (client: GrafeClient, data: RequestData) => Promise<TData>
): [
  (data: RequestData) => void,
  [boolean, boolean, TData | undefined, string | Error | undefined]
] => {
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

  const handleAction = (data?: RequestData) => {
    setState({
      ...state,
      loading: true,
    });

    action(client, data || REQUEST_DATA_DEFAULT)
      .then((result) => {
        console.log("use-lazy-grafe then : ", result);
        setState({
          ...state,
          success: true,
          data: result,
        });

        return result;
      })
      .catch((err) => {
        console.log("use-lazy-grafe error : ", err);
        setState({
          ...state,
          error: err,
        });
      })
      .finally(() => {
        console.log("use-lazy-grafe finally");
        setState({
          ...state,
          loading: false,
        });
      });
  };

  console.log("use-lazy-grafe state : ", state);

  return [
    handleAction,
    [state.loading, state.success, state.data, state.error],
  ];
};
