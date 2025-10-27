import {
  ArrayOptions,
  ArrayResult,
  Base,
  OrganizationEvent,
  User,
} from "../..";
import { UserBookingTicket, UserBookingTicketEndpoints } from "./tickets";
import { Endpoint } from "../../../endpoints";
import { Order } from "../../orders";

export * from "./tickets";

export type UserBookingWithoutTickets = Omit<UserBooking, "tickets">;

export type UserBooking = Base & {
  tickets: UserBookingTicket[];
  order: Order;
  user: User;
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
      "/users/@me/bookings",
      ArrayResult<UserBooking>,
      ArrayOptions<UserBooking>
    >
  | Endpoint<
      "GET",
      "/users/:userId/bookings",
      ArrayResult<UserBooking>,
      ArrayOptions<UserBooking>
    >
  | Endpoint<"GET", "/users/bookings/:bookingId", UserBooking>
  | Endpoint<"GET", "/users/@me/bookings/:bookingId", UserBooking>
  | UserBookingTicketEndpoints;
