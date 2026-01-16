import type {
  Client,
  CreateOrganizationEventTicketDto,
  UpdateOrganizationEventTicketDto,
} from "../../../../rest";

export const organizationsEventsTickets = (client: Client) => ({
  getAll: async (organizationSlug: string, eventSlug: string) =>
    client.get("/organizations/@:organizationSlug/events/:eventSlug/tickets", {
      organizationSlug,
      eventSlug,
    }),
  get: async (organizationSlug: string, eventSlug: string, ticketId: string) =>
    client.get(
      "/organizations/@:organizationSlug/events/:eventSlug/tickets/:ticketId",
      {
        organizationSlug,
        eventSlug,
        ticketId,
      }
    ),
  create: async (
    organizationSlug: string,
    eventSlug: string,
    data: CreateOrganizationEventTicketDto
  ) =>
    client.post(
      "/organizations/@:organizationSlug/events/:eventSlug/tickets",
      data,
      {
        organizationSlug,
        eventSlug,
      }
    ),
  update: async (
    organizationSlug: string,
    eventSlug: string,
    ticketId: string,
    data: UpdateOrganizationEventTicketDto
  ) =>
    client.put(
      "/organizations/@:organizationSlug/events/:eventSlug/tickets/:ticketId",
      data,
      {
        organizationSlug,
        eventSlug,
        ticketId,
      }
    ),
  delete: async (
    organizationSlug: string,
    eventSlug: string,
    ticketId: string
  ) =>
    client.delete(
      "/organizations/@:organizationSlug/events/:eventSlug/tickets/:ticketId",
      null,
      {
        organizationSlug,
        eventSlug,
        ticketId,
      }
    ),
});
