import {
  Client,
  CreateOrganizationEventCartDto,
  UpdateOrganizationEventCartDto,
} from "../../../../rest";

export const organizationsEventCarts = (client: Client) => ({
  getAll: async (organizationSlug: string, eventSlug: string) =>
    client.get("/organizations/:organizationSlug/events/:eventSlug/carts", {
      organizationSlug,
      eventSlug,
    }),
  get: async (organizationSlug: string, eventSlug: string, cartId: string) =>
    client.get(
      "/organizations/:organizationSlug/events/:eventSlug/carts/:cartId",
      {
        organizationSlug,
        eventSlug,
        cartId,
      },
    ),
  create: async (
    organizationSlug: string,
    eventSlug: string,
    data: CreateOrganizationEventCartDto,
  ) =>
    client.post(
      "/organizations/:organizationSlug/events/:eventSlug/carts",
      data,
      {
        organizationSlug,
        eventSlug,
      },
    ),
  update: async (
    organizationSlug: string,
    eventSlug: string,
    cartId: string,
    data: UpdateOrganizationEventCartDto,
  ) =>
    client.put(
      "/organizations/:organizationSlug/events/:eventSlug/carts/:cartId",
      data,
      {
        organizationSlug,
        eventSlug,
        cartId,
      },
    ),
});
