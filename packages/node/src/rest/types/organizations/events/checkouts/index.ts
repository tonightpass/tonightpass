import { OrganizationEventTicket } from "..";
import { ArrayOptions, ArrayResult } from "../../..";
import {
  CreateOrganizationEventCheckoutDto,
  UpdateOrganizationEventCheckoutDto,
} from "../../../../dtos";
import { Endpoint } from "../../../../endpoints";

export type OrganizationEventCheckoutEndpoints =
  | Endpoint<
      "GET",
      "/organizations/:organizationSlug/events/:eventSlug/checkouts",
      ArrayResult<OrganizationEventTicket[]>,
      ArrayOptions<OrganizationEventTicket[]>
    >
  | Endpoint<
      "GET",
      "/organizations/:organizationSlug/events/:eventSlug/checkouts/:checkoutId",
      OrganizationEventTicket[]
    >
  | Endpoint<
      "POST",
      "/organizations/:organizationSlug/events/:eventSlug/checkouts",
      OrganizationEventTicket[],
      CreateOrganizationEventCheckoutDto
    >
  | Endpoint<
      "PUT",
      "/organizations/:organizationSlug/events/:eventSlug/checkouts/:checkoutId",
      OrganizationEventTicket[],
      UpdateOrganizationEventCheckoutDto
    >;
