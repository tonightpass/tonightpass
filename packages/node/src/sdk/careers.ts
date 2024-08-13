import { Query } from "pathcat";

import { sdk } from "./builder";

export const careers = sdk((client) => ({
  categories: {
    getAll: async (query?: Query<"/careers/categories">) =>
      client.get("/careers/categories", query),
  },
  employmentTypes: {
    getAll: async (query?: Query<"/careers/employmentTypes">) =>
      client.get("/careers/employmentTypes", query),
  },
  jobs: {
    getAll: async (query?: Query<"/careers/jobs">) =>
      client.get("/careers/jobs", query),
    get: async (jobId: number) => client.get("/careers/jobs/:jobId", { jobId }),
  },
  offices: {
    getAll: async (query?: Query<"/careers/offices">) =>
      client.get("/careers/offices", query),
  },
}));
