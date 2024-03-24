import { sdk } from "./builder";
import { CareersJob, CareersOffice } from "../rest";

export const careers = sdk((client) => ({
  jobs: {
    getAll: async () => client.get<CareersJob[]>("/careers/jobs"),
  },
  offices: {
    getAll: async () => client.get<CareersOffice[]>("/careers/offices"),
  },
}));
