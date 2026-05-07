import type { Endpoint } from "../../../endpoints";
import type { ArrayOptions, ArrayResult, OrganizationCustomer } from "../..";
import type { Order } from "../../orders";
import type { UserBooking } from "../../users/bookings";

export type OrganizationOrder = Omit<Order, "user"> & {
  customer: OrganizationCustomer;
};

export type OrganizationOrdersEndpoints =
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/orders",
      ArrayResult<OrganizationOrder>,
      ArrayOptions<OrganizationOrder>
    >
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/orders/:orderId",
      OrganizationOrder
    >
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/events/:eventSlug/orders",
      ArrayResult<OrganizationOrder>,
      ArrayOptions<OrganizationOrder>
    >
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/events/:eventSlug/bookings",
      ArrayResult<UserBooking>,
      ArrayOptions<UserBooking>
    >
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/events/:eventSlug/participants",
      ArrayResult<OrganizationCustomer>,
      ArrayOptions<OrganizationCustomer>
    >
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/events/:eventSlug/orders/export",
      string
    >
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/events/:eventSlug/bookings/export",
      string
    >
  | Endpoint<
      "GET",
      "/organizations/@:organizationSlug/events/:eventSlug/participants/export",
      string
    >;
