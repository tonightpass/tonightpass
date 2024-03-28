import { Endpoint } from "../../endpoints";

export type Health<Key extends string> = {
  status: string;
  details: {
    [key in Key]: {
      status: string;
      details: {
        status: string;
      };
    };
  };
};

export type HealthEndpoints =
  | Endpoint<"GET", "/health/database", Health<"database">>
  | Endpoint<"GET", "/health/http", Health<"app">>;
