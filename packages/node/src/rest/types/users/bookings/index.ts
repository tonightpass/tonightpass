import {
  ArrayOptions,
  ArrayResult,
  Base,
  OrganizationEvent,
  OrganizationEventTicket,
  User,
  UserToken,
} from "../..";
import { Endpoint } from "../../../endpoints";
import { Order } from "../../orders";

export type UserBookingTicket = Base & {
  booking: UserBooking;
  ticket: OrganizationEventTicket;
  token: UserToken;
  useCount: number;
};

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
  | Endpoint<"GET", "/users/bookings/:bookingId", UserBooking>;
