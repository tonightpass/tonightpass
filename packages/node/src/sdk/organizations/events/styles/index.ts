import { Client } from "../../../../rest";
import {
  CreateOrganizationEventStyleDto,
  UpdateOrganizationEventStyleDto,
} from "../../../../rest/dtos/organizations/events/styles";

export const organizationsEventsStyles = (client: Client) => ({
  getAll: async () => client.get("/organizations/events/styles"),
  get: async (styleSlug: string) =>
    client.get("/organizations/events/styles/:styleSlug", { styleSlug }),
  create: async (data: CreateOrganizationEventStyleDto) =>
    client.post("/organizations/events/styles", data),
  update: async (styleSlug: string, data: UpdateOrganizationEventStyleDto) =>
    client.put("/organizations/events/styles/:styleSlug", data, { styleSlug }),
  delete: async (styleSlug: string) =>
    client.delete("/organizations/events/styles/:styleSlug", null, {
      styleSlug,
    }),
});
