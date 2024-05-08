import { organizationsEventsStyles } from "./styles";
import { organizationsEventsTickets } from "./tickets";
import {
  Client,
  CreateOrganizationEventDto,
  UpdateOrganizationEventDto,
} from "../../../rest";

export const organizationsEvents = (client: Client) => ({
  getAll: async (slug: string) =>
    client.get("/organizations/:slug/events", {
      slug,
    }),
  get: async (organizationSlug: string, eventSlug: string) =>
    client.get("/organizations/:organizationSlug/events/:eventSlug", {
      organizationSlug,
      eventSlug,
    }),
  create: async (slug: string, data: CreateOrganizationEventDto) =>
    client.post("/organizations/:slug/events", data, {
      slug,
    }),
  update: async (
    organizationSlug: string,
    eventSlug: string,
    data: UpdateOrganizationEventDto,
  ) =>
    client.put("/organizations/:organizationSlug/events/:eventSlug", data, {
      organizationSlug,
      eventSlug,
    }),
  delete: async (organizationSlug: string, eventSlug: string) =>
    client.delete("/organizations/:organizationSlug/events/:eventSlug", null, {
      organizationSlug,
      eventSlug,
    }),
  styles: organizationsEventsStyles(client),
  tickets: organizationsEventsTickets(client),
});
