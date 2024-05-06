import { Client } from "../../../../rest";
import {
  CreateOrganizationEventStyleDto,
  UpdateOrganizationEventStyleDto,
} from "../../../../rest/dtos/organizations/events/events";

export const organizationsEventsStyles = (client: Client) => ({
  getAll: async () => client.get("/organizations/events/styles"),
  get: async (slug: string) =>
    client.get("/organizations/events/styles/:slug", { slug }),
  create: async (data: CreateOrganizationEventStyleDto) =>
    client.post("/organizations/events/styles", data),
  update: async (slug: string, data: UpdateOrganizationEventStyleDto) =>
    client.put("/organizations/events/styles/:slug", data, { slug }),
  delete: async (slug: string) =>
    client.delete("/organizations/events/styles/:slug", null, { slug }),
});
