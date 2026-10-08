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

  /** Undoes `record` for the same person, by account or by session cookie. */
  remove: async (organizationSlug: string, eventSlug: string) =>
    client.delete(
      "/organizations/@:organizationSlug/events/:eventSlug/interests",
      undefined,
      {
        organizationSlug,
        eventSlug,
      }
    ),
});
