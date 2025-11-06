import { sdk } from "../../builder";

export const organizationsCustomers = sdk((client) => ({
  getAll: async (organizationSlug: string) =>
    client.get("/organizations/@:organizationSlug/customers", {
      organizationSlug,
    }),
  get: async (organizationSlug: string, username: string) =>
    client.get("/organizations/@:organizationSlug/customers/:username", {
      organizationSlug,
      username,
    }),
}));
