import type { Query } from "pathcat";

import { sdk } from "../../builder";

export const organizationsOrders = sdk((client) => ({
  getAll: async (query?: Query<"/organizations/@:organizationSlug/orders">) =>
    client.get("/organizations/@:organizationSlug/orders", query),
  get: async (
    query: Query<"/organizations/@:organizationSlug/orders/:orderId">
  ) => client.get("/organizations/@:organizationSlug/orders/:orderId", query),
  getAllByEvent: async (
    query?: Query<"/organizations/@:organizationSlug/events/:eventSlug/orders">
  ) =>
    client.get(
      "/organizations/@:organizationSlug/events/:eventSlug/orders",
      query
    ),
  getBookingsByEvent: async (
    query?: Query<"/organizations/@:organizationSlug/events/:eventSlug/bookings">
  ) =>
    client.get(
      "/organizations/@:organizationSlug/events/:eventSlug/bookings",
      query
    ),
  getParticipantsByEvent: async (
    query?: Query<"/organizations/@:organizationSlug/events/:eventSlug/participants">
  ) =>
    client.get(
      "/organizations/@:organizationSlug/events/:eventSlug/participants",
      query
    ),
}));
