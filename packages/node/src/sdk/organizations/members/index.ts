import { Client } from "../../../rest";
import {
  CreateOrganizationMemberDto,
  UpdateOrganizationMemberDto,
} from "../../../rest/dtos";

export const organizationsMembers = (client: Client) => ({
  me: async () => client.get("/organizations/members/@me"),
  get: async (organizationSlug: string) =>
    client.get("/organizations/:organizationSlug/members", {
      organizationSlug,
    }),
  create: async (organizationSlug: string, data: CreateOrganizationMemberDto) =>
    client.post("/organizations/:organizationSlug/members", data, {
      organizationSlug,
    }),
  update: async (
    organizationSlug: string,
    userId: string,
    data: UpdateOrganizationMemberDto,
  ) =>
    client.put("/organizations/:organizationSlug/members/:userId", data, {
      organizationSlug,
      userId,
    }),
  delete: async (organizationSlug: string, userId: string) =>
    client.delete("/organizations/:organizationSlug/members/:userId", null, {
      organizationSlug,
      userId,
    }),
});
