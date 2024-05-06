import {
  Client,
  CreateOrganizationEventTicketDto,
  UpdateOrganizationEventTicketDto,
} from "../../../../rest";

export const organizationsEventsTickets = (client: Client) => ({
  getAll: async (slug: string, eventSlug: string) =>
    client.get("/organizations/:slug/events/:eventSlug/tickets", {
      slug,
      eventSlug,
    }),
  get: async (slug: string, eventSlug: string, ticketId: string) =>
    client.get("/organizations/:slug/events/:eventSlug/tickets/:ticketId", {
      slug,
      eventSlug,
      ticketId,
    }),
  create: async (
    slug: string,
    eventSlug: string,
    data: CreateOrganizationEventTicketDto,
  ) =>
    client.post("/organizations/:slug/events/:eventSlug/tickets", data, {
      slug,
      eventSlug,
    }),
  update: async (
    slug: string,
    eventSlug: string,
    ticketId: string,
    data: UpdateOrganizationEventTicketDto,
  ) =>
    client.put(
      "/organizations/:slug/events/:eventSlug/tickets/:ticketId",
      data,
      {
        slug,
        eventSlug,
        ticketId,
      },
    ),
  delete: async (slug: string, eventSlug: string, ticketId: string) =>
    client.delete(
      "/organizations/:slug/events/:eventSlug/tickets/:ticketId",
      null,
      {
        slug,
        eventSlug,
        ticketId,
      },
    ),
});
