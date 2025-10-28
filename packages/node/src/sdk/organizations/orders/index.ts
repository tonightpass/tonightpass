import { sdk } from "../../builder";

export const organizationsOrders = sdk((client) => ({
  getAll: async (organizationSlug: string) =>
    client.get("/organizations/:organizationSlug/orders", {
      organizationSlug,
    }),
  get: async (organizationSlug: string, orderId: string) =>
    client.get("/organizations/:organizationSlug/orders/:orderId", {
      organizationSlug,
      orderId,
    }),
  getAllByEvent: async (organizationSlug: string, eventSlug: string) =>
    client.get("/organizations/:organizationSlug/events/:eventSlug/orders", {
      organizationSlug,
      eventSlug,
    }),
}));
