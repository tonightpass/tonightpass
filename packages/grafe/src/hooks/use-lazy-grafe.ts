import React from "react";

import { GrafeClient } from "../client";
import { GrafeContext } from "../contexts";
import { APIResponse } from "../types/api-response";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useLazyGrafe = <TData = any>(
  action: (client: GrafeClient) => Promise<APIResponse<TData>>
): [() => void, [boolean, boolean, TData | undefined, string | undefined]] => {
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

  const handleAction = () => {
    setState({
      ...state,
      loading: true,
    });

    action(client)
      .then((result) => {
        setState({
          ...state,
          success: result.success,
          data: result.data,
          error: result.error,
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
