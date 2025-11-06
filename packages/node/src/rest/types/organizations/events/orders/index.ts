import { CreateOrganizationEventOrderDto } from "../../../../dtos";
import { Endpoint } from "../../../../endpoints";
import { Order } from "../../../orders";

export type OrganizationEventOrderEndpoints = Endpoint<
  "POST",
  "/organizations/@:organizationSlug/events/:eventSlug/orders",
  Order,
  CreateOrganizationEventOrderDto
>;
