import type {
  Client,
  CreateOrganizationEventInterestInput,
} from "../../../../rest";

export const organizationsEventsInterests = (client: Client) => ({
  record: async (
    organizationSlug: string,
    eventSlug: string,
    data: CreateOrganizationEventInterestInput = {}
  ) =>
    client.post(
      "/organizations/@:organizationSlug/events/:eventSlug/interests",
      data,
      {
        organizationSlug,
        eventSlug,
      }
    ),
});
