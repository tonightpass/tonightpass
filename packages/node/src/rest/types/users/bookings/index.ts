import {
  ArrayOptions,
  ArrayResult,
  Base,
  OrganizationEventTicket,
} from "../..";
import { Endpoint } from "../../../endpoints";
import { Order } from "../../orders";

export type UserBooking = Base & {
  ticket: OrganizationEventTicket;
  order: Order;
};

export type UserBookingEndpoints =
  | Endpoint<
      "GET",
      "/users/bookings",
      ArrayResult<UserBooking>,
      ArrayOptions<UserBooking>
    >
  | Endpoint<"GET", "/users/bookings/:bookingId", UserBooking>;
