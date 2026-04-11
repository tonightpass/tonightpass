import type { Endpoint } from "../../../../endpoints";

export type OrganizationEventViewOptions = {
  events: string | string[];
};

export type OrganizationEventViewResult = {
  eventId: string;
  viewsCount: number;
};

export type OrganizationEventViewEndpoints =
  | Endpoint<
      "POST",
      "/organizations/@:organizationSlug/events/:eventSlug/views",
      boolean,
      null
    >
  | Endpoint<
      "GET",
      "/organizations/events/views/stream",
      ReadableStream<OrganizationEventViewResult>,
      OrganizationEventViewOptions
    >;
