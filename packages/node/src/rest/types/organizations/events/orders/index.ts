import type { CreateOrganizationEventOrderDto } from "../../../../dtos";
import type { Endpoint } from "../../../../endpoints";
import type { Order } from "../../../orders";

export type OrganizationEventOrderEndpoints = Endpoint<
  "POST",
  "/organizations/@:organizationSlug/events/:eventSlug/orders",
  Order,
  CreateOrganizationEventOrderDto
>;
