import { ArrayOptions, ArrayResult, OrganizationCustomer } from "../..";
import { Endpoint } from "../../../endpoints";
import { Order } from "../../orders";

export type OrganizationOrder = Omit<Order, "user"> & {
  customer: OrganizationCustomer;
};

export type OrganizationOrdersEndpoints =
  | Endpoint<
      "GET",
      "/organizations/:organizationSlug/orders",
      ArrayResult<OrganizationOrder>,
      ArrayOptions<OrganizationOrder>
    >
  | Endpoint<
      "GET",
      "/organizations/:organizationSlug/orders/:orderId",
      OrganizationOrder
    >
  | Endpoint<
      "GET",
      "/organizations/:organizationSlug/events/:eventSlug/orders",
      ArrayResult<OrganizationOrder>,
      ArrayOptions<OrganizationOrder>
    >;
