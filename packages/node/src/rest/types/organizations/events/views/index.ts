import { Endpoint } from "../../../../endpoints";

export type OrganizationEventViewEndpoints = Endpoint<
  "POST",
  "/organizations/:organizationSlug/events/:eventSlug/views",
  boolean,
  null
>;
