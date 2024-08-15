import {
  Client,
  CreateOrganizationEventCheckoutDto,
  UpdateOrganizationEventCheckoutDto,
} from "../../../../rest";

export const organizationsEventCheckouts = (client: Client) => ({
  getAll: async (organizationSlug: string, eventSlug: string) =>
    client.get("/organizations/:organizationSlug/events/:eventSlug/checkouts", {
      organizationSlug,
      eventSlug,
    }),
  get: async (
    organizationSlug: string,
    eventSlug: string,
    checkoutId: string,
  ) =>
    client.get(
      "/organizations/:organizationSlug/events/:eventSlug/checkouts/:checkoutId",
      {
        organizationSlug,
        eventSlug,
        checkoutId,
      },
    ),
  create: async (
    organizationSlug: string,
    eventSlug: string,
    data: CreateOrganizationEventCheckoutDto,
  ) =>
    client.post(
      "/organizations/:organizationSlug/events/:eventSlug/checkouts",
      data,
      {
        organizationSlug,
        eventSlug,
      },
    ),
  update: async (
    organizationSlug: string,
    eventSlug: string,
    checkoutId: string,
    data: UpdateOrganizationEventCheckoutDto,
  ) =>
    client.put(
      "/organizations/:organizationSlug/events/:eventSlug/checkouts/:checkoutId",
      data,
      {
        organizationSlug,
        eventSlug,
        checkoutId,
      },
    ),
});
