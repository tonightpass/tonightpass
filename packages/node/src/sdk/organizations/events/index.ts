import { organizationsEventsStyles } from "./styles";
import { organizationsEventsTickets } from "./tickets";
import {
  CreateOrganizationEventDto,
  UpdateOrganizationEventDto,
} from "../../../rest";
import { sdk } from "../../builder";

export const organizationsEvents = sdk((client) => ({
  getAll: async (organizationSlug: string) =>
    client.get("/organizations/:organizationSlug/events", {
      organizationSlug,
    }),
  get: async (organizationSlug: string, eventSlug: string) =>
    client.get("/organizations/:organizationSlug/events/:eventSlug", {
      organizationSlug,
      eventSlug,
    }),
  create: async (organizationSlug: string, data: CreateOrganizationEventDto) =>
    client.post("/organizations/:organizationSlug/events", data, {
      organizationSlug,
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
  styles: organizationsEventsStyles,
  tickets: organizationsEventsTickets,
}));
