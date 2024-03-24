import { sdk } from "./builder";

export const health = sdk((client) => ({
  http: async () =>
    client.get<{
      status: string;
      details: {
        app: {
          status: string;
          details: {
            status: string;
          };
        };
      };
    }>("/health/http"),
}));
