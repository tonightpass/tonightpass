import React from "react";

import { GrafeClient } from "../client";
import { GrafeContext } from "../contexts";
import { APIResponse } from "../types/api-response";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RequestData = { variables: { [key: string]: any } };

const REQUEST_DATA_DEFAULT: RequestData = { variables: {} };

type ResultType<TData> = {
  loading: boolean;
  success?: boolean;
  data?: TData;
  error?: string | Error;
};

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
  action: (
    client: GrafeClient,
    data: RequestData
  ) => Promise<APIResponse<TData>>
): [
  (data: RequestData) => Promise<APIResponse<TData>>,
  [boolean, boolean | undefined, TData | undefined, string | Error | undefined]
] => {
  const { client } = React.useContext(GrafeContext);

  if (!client) {
    throw new Error("Grafe client not found");
  }

  const [result, setResult] = React.useState<ResultType<TData>>({
    loading: false,
  });

  const handleAction = async (
    data?: RequestData
  ): Promise<APIResponse<TData>> => {
    setResult((prev) => ({
      ...prev,
      loading: true,
    }));

    return action(client, data || REQUEST_DATA_DEFAULT)
      .then((result) => {
        const [data, error] = result;

        if (!data || error) {
          setResult({
            loading: false,
            success: false,
            error: error || "Unknown error",
          });

          return result;
        }

        setResult({
          loading: false,
          success: true,
          data: data,
        });

        return result;
      })
      .catch((err) => {
        setResult({
          loading: false,
          success: false,
          error: err,
        });

        return [null, err];
      });
  };

  return [
    handleAction,
    [result.loading, result.success, result.data, result.error],
  ];
};
