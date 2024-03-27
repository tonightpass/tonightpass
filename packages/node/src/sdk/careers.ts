import { sdk } from "./builder";

export const careers = sdk((client) => ({
  jobs: {
    getAll: async () => client.get("/careers/jobs"),
  },
  offices: {
    getAll: async () => client.get("/careers/offices"),
  },
}));
