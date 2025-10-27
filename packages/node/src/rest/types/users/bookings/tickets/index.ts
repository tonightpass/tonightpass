import { UserBookingWithoutTickets } from "..";
import { Base, OrganizationEventTicket, UserToken } from "../../..";
import { Endpoint } from "../../../../endpoints";

export type UserBookingTicket = Base & {
  booking: UserBookingWithoutTickets;
  ticket: OrganizationEventTicket;
  token: UserToken;
  useCount: number;
};

export type UserBookingTicketEndpoints =
  | Endpoint<
      "GET",
      "/users/bookings/tickets/:ticketId",
      UserBookingTicket,
      {
        tokenId: string;
        tokenValue: string;
      }
    >
  | Endpoint<
      "PUT",
      "/users/bookings/tickets/:ticketId/use",
      UserBookingTicket,
      {
        tokenId: string;
        tokenValue: string;
      }
    >;
