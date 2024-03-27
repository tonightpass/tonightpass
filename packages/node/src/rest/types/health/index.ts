import { Endpoint } from "../../endpoints";

export type HealthHttp = {
  status: string;
  details: {
    app: {
      status: string;
      details: {
        status: string;
      };
    };
  };
};

export type HealthEndpoints = Endpoint<"GET", "/health/http", HealthHttp>;
