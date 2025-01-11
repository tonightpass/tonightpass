import { organizationsEventsOrders } from "./orders";
import { organizationsEventsStyles } from "./styles";
import { organizationsEventsTickets } from "./tickets";
import { organizationsEventsViews } from "./views";
import {
  ArrayOptions,
  Client,
  CreateOrganizationEventDto,
  OrganizationEvent,
  UpdateOrganizationEventDto,
} from "../../../rest";

export const organizationsEvents = (client: Client) => ({
  search: async (query: string, limit?: number) =>
    client.get("/organizations/events/search", { q: query, limit }),
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
  getPast: async (
    organizationSlug: string,
    options?: ArrayOptions<OrganizationEvent>,
  ) =>
    client.get("/organizations/:organizationSlug/events/past", {
      organizationSlug,
      ...options,
    }),
  getUpcoming: async (
    organizationSlug: string,
    options?: ArrayOptions<OrganizationEvent>,
  ) =>
    client.get("/organizations/:organizationSlug/events/upcoming", {
      organizationSlug,
      ...options,
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
  orders: organizationsEventsOrders(client),
  styles: organizationsEventsStyles(client),
  tickets: organizationsEventsTickets(client),
  views: organizationsEventsViews(client),
});
