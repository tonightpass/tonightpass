import { OrganizationEvent, OrganizationEventTicket } from "..";
import { ArrayOptions, ArrayResult } from "../../..";
import {
  CreateOrganizationEventCartDto,
  UpdateOrganizationEventCartDto,
} from "../../../../dtos";
import { Endpoint } from "../../../../endpoints";

export type OrganizationEventCart = {
  organizationEvent: OrganizationEvent;
  tickets: OrganizationEventCartTicket[];
};

export type OrganizationEventCartTicket = {
  ticket: OrganizationEventTicket;
  quantity: number;
};

export type OrganizationEventCartEndpoints =
  | Endpoint<
      "GET",
      "/organizations/:organizationSlug/events/:eventSlug/carts",
      ArrayResult<OrganizationEventCart>,
      ArrayOptions<OrganizationEventCart>
    >
  | Endpoint<
      "GET",
      "/organizations/:organizationSlug/events/:eventSlug/carts/:cartId",
      OrganizationEventCart
    >
  | Endpoint<
      "POST",
      "/organizations/:organizationSlug/events/:eventSlug/carts",
      OrganizationEventCart,
      CreateOrganizationEventCartDto
    >
  | Endpoint<
      "PUT",
      "/organizations/:organizationSlug/events/:eventSlug/carts/:cartId",
      OrganizationEventCart,
      UpdateOrganizationEventCartDto
    >;
