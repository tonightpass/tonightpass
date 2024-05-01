import { sdk } from "./builder";
import {
  CreateOrganizationDto,
  CreateOrganizationEventDto,
  CreateOrganizationEventTicketDto,
  UpdateOrganizationDto,
  UpdateOrganizationEventTicketDto,
} from "../rest";
import { isBrowser } from "../utils";

export const organizations = sdk((client) => ({
  getAll: async () => client.get("/organizations"),
  get: async (slug: string) => client.get("/organizations/:slug", { slug }),
  create: async (data: CreateOrganizationDto) =>
    client.post("/organizations", data),
  update: async (slug: string, data: UpdateOrganizationDto) =>
    client.put("/organizations/:slug", data, { slug }),
  delete: async (slug: string) =>
    client.delete("/organizations/:slug", null, { slug }),
  members: {
    getAll: async () => client.get("/organizations/members"),
    delete: async (id: string) =>
      client.delete("/organizations/members/:id", null, { id }),
  },
  events: {
    getAll: async (organizationSlug: string) =>
      client.get("/organizations/:organizationSlug/events", {
        organizationSlug,
      }),
    get: async (organizationSlug: string, eventSlug: string) =>
      client.get("/organizations/:organizationSlug/events/:eventSlug", {
        organizationSlug,
        eventSlug,
      }),
    create: async (
      organizationSlug: string,
      data: CreateOrganizationEventDto,
    ) =>
      client.post("/organizations/:organizationSlug/events", data, {
        organizationSlug,
      }),
    update: async (
      organizationSlug: string,
      eventSlug: string,
      data: CreateOrganizationEventDto,
    ) =>
      client.put("/organizations/:organizationSlug/events/:eventSlug", data, {
        organizationSlug,
        eventSlug,
      }),
    delete: async (organizationSlug: string, eventSlug: string) =>
      client.delete(
        "/organizations/:organizationSlug/events/:eventSlug",
        null,
        {
          organizationSlug,
          eventSlug,
        },
      ),
    tickets: {
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
    },
  },
  billing: {
    account: async (slug: string) =>
      client.get("/organizations/:slug/billing/account", { slug }),
    link: (slug: string) => {
      if (isBrowser) {
        window.location.href = client.url("/organizations/:slug/billing/link", {
          slug,
        });
      } else {
        throw new Error("Billing link is only available in the browser");
      }
    },
    dashboard: (slug: string) => {
      if (isBrowser) {
        window.location.href = client.url(
          "/organizations/:slug/billing/dashboard",
          {
            slug,
          },
        );
      } else {
        throw new Error("Billing dashboard is only available in the browser");
      }
    },
  },
}));
