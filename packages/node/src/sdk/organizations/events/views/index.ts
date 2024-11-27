import { Client } from "../../../../rest";

export const organizationsEventsViews = (client: Client) => ({
  record: async (organizationSlug: string, eventSlug: string) =>
    client.post(
      "/organizations/:organizationSlug/events/:eventSlug/views",
      null,
      {
        organizationSlug,
        eventSlug,
      },
    ),
});
