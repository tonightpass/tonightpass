import type { Endpoint } from "../../../endpoints";
import type {
  ArrayOptions,
  ArrayResult,
  Base,
  OrganizationCustomer,
  OrganizationEvent,
} from "../..";
import type { Order } from "../../orders";
import type { UserBookingTicket, UserBookingTicketEndpoints } from "./tickets";

export * from "./tickets";

export type UserBookingWithoutTickets = Omit<UserBooking, "tickets">;

export type UserBooking = Base & {
  tickets: UserBookingTicket[];
  order: Order;
  customer: OrganizationCustomer;
  event: OrganizationEvent;
};

export type UserBookingEndpoints =
  | Endpoint<
      "GET",
      "/users/bookings",
      ArrayResult<UserBooking>,
      ArrayOptions<UserBooking>
    >
  | Endpoint<
      "GET",
      "/users/~me/bookings",
      ArrayResult<UserBooking>,
      ArrayOptions<UserBooking>
    >
  | Endpoint<
      "GET",
      "/users/@:userId/bookings",
      ArrayResult<UserBooking>,
      ArrayOptions<UserBooking>
    >
  | Endpoint<"GET", "/users/bookings/:bookingId", UserBooking>
  | Endpoint<"GET", "/users/~me/bookings/:bookingId", UserBooking>
  | UserBookingTicketEndpoints;
