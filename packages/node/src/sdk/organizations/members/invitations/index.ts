import { Client } from "../../../../rest";
import {
  AcceptOrganizationMemberInvitationDto,
  CreateOrganizationMemberInvitationLinkDto,
} from "../../../../rest/dtos";

export const invitations = (client: Client) => ({
  getLinks: async (organizationSlug: string) =>
    client.get("/organizations/:organizationSlug/members/invitations/links", {
      organizationSlug,
    }),
  createLink: async (
    organizationSlug: string,
    data: CreateOrganizationMemberInvitationLinkDto = {},
  ) =>
    client.post(
      "/organizations/:organizationSlug/members/invitations/links",
      data,
      {
        organizationSlug,
      },
    ),
  accept: async (
    organizationSlug: string,
    data: AcceptOrganizationMemberInvitationDto,
  ) =>
    client.post(
      "/organizations/:organizationSlug/members/invitations/accept",
      data,
      {
        organizationSlug,
      },
    ),
});