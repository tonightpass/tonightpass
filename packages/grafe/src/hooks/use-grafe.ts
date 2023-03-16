import React from "react";

import { GrafeClient } from "../client/grafe-client";
import { GrafeContext } from "../contexts/Grafe";
import { APIResponse } from "../types/api-response";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useGrafe = <TData = any>(
  action: (client: GrafeClient) => Promise<APIResponse<TData>>
): [boolean, boolean, TData | undefined, string | undefined] => {
  const { client } = React.useContext(GrafeContext);

  if (!client) {
    throw new Error("Grafe client not found");
  }

  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [data, setData] = React.useState<TData | undefined>(undefined);
  const [error, setError] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    setLoading(true);

    action(client)
      .then((result) => {
        setSuccess(result.success);
        setData(result.data);
        setError(result.error);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [action, client]);

  return [loading, success, data, error];
};
