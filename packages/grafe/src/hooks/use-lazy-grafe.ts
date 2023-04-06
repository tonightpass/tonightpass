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
  (data: RequestData) => Promise<undefined | TData>,
  [boolean, boolean, TData | undefined, string | Error | undefined]
] => {
  const { client } = React.useContext(GrafeContext);

  if (!client) {
    throw new Error("Grafe client not found");
  }

  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [data, setData] = React.useState<TData | undefined>(undefined);
  const [error, setError] = React.useState<string | Error | undefined>();

  const handleAction = (data?: RequestData): Promise<undefined | TData> => {
    setLoading(true);

    const result = action(client, data || REQUEST_DATA_DEFAULT)
      .then((result) => {
        setData(result);
        setSuccess(true);

        return result;
      })
      .catch((err) => {
        setError(err);

        return undefined;
      })
      .finally(() => {
        setLoading(false);
      });

    return result;
  };

  return [handleAction, [loading, success, data, error]];
};
