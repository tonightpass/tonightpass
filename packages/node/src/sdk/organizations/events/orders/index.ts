import type { Client, CreateOrganizationEventOrderDto } from "../../../../rest";

export const organizationsEventsOrders = (client: Client) => ({
  create: async (
    organizationSlug: string,
    eventSlug: string,
    data: CreateOrganizationEventOrderDto
  ) =>
    client.post(
      "/organizations/@:organizationSlug/events/:eventSlug/orders",
      data,
      {
        organizationSlug,
        eventSlug,
      }
    ),
});
