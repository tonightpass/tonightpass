import { organizationsEventCheckouts } from "./checkouts";
import { organizationsEventsStyles } from "./styles";
import { organizationsEventsTickets } from "./tickets";
import {
  ArrayOptions,
  Client,
  CreateOrganizationEventDto,
  OrganizationEvent,
  UpdateOrganizationEventDto,
} from "../../../rest";

export const organizationsEvents = (client: Client) => ({
  getAll: async (
    organizationSlug?: string,
    options?: ArrayOptions<OrganizationEvent>,
  ) => {
    if (organizationSlug) {
      return client.get("/organizations/:organizationSlug/events", {
        organizationSlug,
        ...options,
      });
    } else {
      return client.get("/organizations/events", options);
    }
  },
  getSuggestions: async (options?: ArrayOptions<OrganizationEvent>) =>
    client.get("/organizations/events/suggestions", options),
  getNearby: async (
    options: ArrayOptions<OrganizationEvent> & {
      latitude: number;
      longitude: number;
      radius?: number;
    },
  ) => client.get("/organizations/events/nearby", options),
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
  checkouts: organizationsEventCheckouts(client),
  styles: organizationsEventsStyles(client),
  tickets: organizationsEventsTickets(client),
});
