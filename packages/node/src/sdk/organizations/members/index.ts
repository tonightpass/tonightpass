import { invitations } from "./invitations";
import { Client } from "../../../rest";
import {
  CreateOrganizationMemberDto,
  UpdateOrganizationMemberDto,
} from "../../../rest/dtos";

export const organizationsMembers = (client: Client) => ({
  me: async () => client.get("/organizations/members/~me"),
  get: async (organizationSlug: string) =>
    client.get("/organizations/@:organizationSlug/members", {
      organizationSlug,
    }),
  create: async (organizationSlug: string, data: CreateOrganizationMemberDto) =>
    client.post("/organizations/@:organizationSlug/members", data, {
      organizationSlug,
    }),
  update: async (
    organizationSlug: string,
    username: string,
    data: UpdateOrganizationMemberDto,
  ) =>
    client.put("/organizations/@:organizationSlug/members/:username", data, {
      organizationSlug,
      username,
    }),
  delete: async (organizationSlug: string, username: string) =>
    client.delete(
      "/organizations/@:organizationSlug/members/:username",
      undefined,
      {
        organizationSlug,
        username,
      },
    ),
  invitations: invitations(client),
  accept: async (organizationSlug: string) =>
    client.put(
      "/organizations/@:organizationSlug/members/~me/accept",
      undefined,
      {
        organizationSlug,
      },
    ),
  reject: async (organizationSlug: string) =>
    client.delete(
      "/organizations/@:organizationSlug/members/~me/reject",
      undefined,
      {
        organizationSlug,
      },
    ),
  leave: async (organizationSlug: string) =>
    client.delete("/organizations/@:organizationSlug/members/~me", undefined, {
      organizationSlug,
    }),
});
