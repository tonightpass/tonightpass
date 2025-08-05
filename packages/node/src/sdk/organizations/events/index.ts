import { organizationsEventsOrders } from "./orders";
import { organizationsEventsStyles } from "./styles";
import { organizationsEventsTickets } from "./tickets";
import { organizationsEventsViews } from "./views";
import {
  ArrayOptions,
  Client,
  CreateOrganizationEventDto,
  OrganizationEvent,
  OrganizationEventArrayOptions,
  OrganizationEventFileType,
  UpdateOrganizationEventDto,
} from "../../../rest";
import { buildFileFormData } from "../../../utils";

export const organizationsEvents = (client: Client) => ({
  search: async (query: string, limit?: number) =>
    client.get("/organizations/events/search", { q: query, limit }),
  getAll: async (
    organizationSlug?: string,
    options?: OrganizationEventArrayOptions,
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
  uploadFile: async (eventFileType: OrganizationEventFileType, file: File) =>
    client.post(
      "/events/files/:eventFileType",
      buildFileFormData("file", file),
      { eventFileType },
    ),
  uploadOrganizationFile: async (
    organizationSlug: string,
    eventSlug: string,
    eventFileType: OrganizationEventFileType,
    file: File,
  ) =>
    client.post(
      "/organizations/:organizationSlug/events/:eventSlug/files/:eventFileType",
      buildFileFormData("file", file),
      { organizationSlug, eventSlug, eventFileType },
    ),
  orders: organizationsEventsOrders(client),
  styles: organizationsEventsStyles(client),
  tickets: organizationsEventsTickets(client),
  views: organizationsEventsViews(client),
});
