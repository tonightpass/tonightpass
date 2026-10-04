import type {
  ArrayOptions,
  Client,
  ConfirmOrganizationEventClaimDto,
  CreateOrganizationEventDto,
  OrganizationEvent,
  OrganizationEventArrayOptions,
  OrganizationEventFileType,
  OrganizationEventNearbyOptions,
  UpdateOrganizationEventDto,
} from "../../../rest";
import { buildFileFormData, type FileObject } from "../../../utils";
import { organizationsEventsInterests } from "./interests";
import { organizationsEventsOrders } from "./orders";
import { organizationsEventsPromoCodes } from "./promo-codes";
import { organizationsEventsStyles } from "./styles";
import { organizationsEventsTickets } from "./tickets";
import { organizationsEventsViews } from "./views";

export const organizationsEvents = (client: Client) => ({
  search: async (query: string, options?: ArrayOptions<OrganizationEvent>) =>
    client.get("/organizations/events/search", { q: query, ...options }),
  getCalendar: async (year: number, month: number) =>
    client.get("/organizations/events/calendar/:year/:month", {
      year: year.toString(),
      month: month.toString(),
    }),
  getAll: async (
    organizationSlug?: string,
    options?: OrganizationEventArrayOptions
  ) => {
    if (organizationSlug) {
      return client.get("/organizations/@:organizationSlug/events", {
        organizationSlug,
        ...options,
      });
    }
    return client.get("/organizations/events", options);
  },
  getSuggestions: async (options?: ArrayOptions<OrganizationEvent>) =>
    client.get("/organizations/events/suggestions", options),
  getNearby: async (options: OrganizationEventNearbyOptions) =>
    client.get("/organizations/events/nearby", options),
  get: async (organizationSlug: string, eventSlug: string) =>
    client.get("/organizations/@:organizationSlug/events/:eventSlug", {
      organizationSlug,
      eventSlug,
    }),
  create: async (organizationSlug: string, data: CreateOrganizationEventDto) =>
    client.post("/organizations/@:organizationSlug/events", data, {
      organizationSlug,
    }),
  update: async (
    organizationSlug: string,
    eventSlug: string,
    data: UpdateOrganizationEventDto
  ) =>
    client.put("/organizations/@:organizationSlug/events/:eventSlug", data, {
      organizationSlug,
      eventSlug,
    }),
  delete: async (organizationSlug: string, eventSlug: string) =>
    client.delete(
      "/organizations/@:organizationSlug/events/:eventSlug",
      undefined,
      {
        organizationSlug,
        eventSlug,
      }
    ),
  uploadFile: async (
    eventFileType: OrganizationEventFileType,
    file: File | FileObject
  ) =>
    client.post(
      "/events/files/:eventFileType",
      buildFileFormData("file", file),
      { eventFileType }
    ),
  uploadOrganizationFile: async (
    organizationSlug: string,
    eventSlug: string,
    eventFileType: OrganizationEventFileType,
    file: File | FileObject
  ) =>
    client.post(
      "/organizations/@:organizationSlug/events/:eventSlug/files/:eventFileType",
      buildFileFormData("file", file),
      { organizationSlug, eventSlug, eventFileType }
    ),
  request: async (organizationSlug: string, eventSlug: string) =>
    client.post(
      "/organizations/@:organizationSlug/events/:eventSlug/request",
      undefined,
      { organizationSlug, eventSlug }
    ),
  claim: {
    /** Sends a 6 digit code to the email address scraped with the event. */
    request: async (organizationSlug: string, eventSlug: string) =>
      client.post(
        "/organizations/@:organizationSlug/events/:eventSlug/claim",
        undefined,
        { organizationSlug, eventSlug }
      ),
    /** Verifies the code and moves the event to the caller's organization. */
    confirm: async (
      organizationSlug: string,
      eventSlug: string,
      data: ConfirmOrganizationEventClaimDto
    ) =>
      client.post(
        "/organizations/@:organizationSlug/events/:eventSlug/claim/confirm",
        data,
        { organizationSlug, eventSlug }
      ),
  },
  orders: organizationsEventsOrders(client),
  promoCodes: organizationsEventsPromoCodes(client),
  styles: organizationsEventsStyles(client),
  tickets: organizationsEventsTickets(client),
  interests: organizationsEventsInterests(client),
  views: organizationsEventsViews(client),
});
